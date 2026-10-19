const backendApiBase =
  process.env.NEXT_PUBLIC_API_URL ??
  `${process.env.BACKEND_URL ?? "https://sprintflow-backend.vercel.app"}${process.env.BACKEND_API_PREFIX ?? "/api/v1"}`;

export function backendUrl(path: string) {
  return `${backendApiBase.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export async function requestBackendAuth(path: string, body: unknown) {
  let response: Response | undefined;
  const targetUrl = backendUrl(path);

  try {
    response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    // Upstream fetch failed, proceed to local fallback
  }

  // If remote upstream returned an error (404, 500) or was unreachable, try local backend
  if (
    (!response || response.status >= 400) &&
    !targetUrl.includes("localhost")
  ) {
    try {
      const cleanPath = path.replace(/^\/+/, "");
      const localResponse = await fetch(
        `http://localhost:5000/api/v1/${cleanPath}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
          cache: "no-store",
        },
      );
      if (localResponse.ok || localResponse.status !== 404) {
        response = localResponse;
      }
    } catch {
      // Local backend not reachable
    }
  }

  if (!response) {
    throw new Error("Could not reach the SprintFlow API.");
  }

  const payload: unknown = await response.json().catch(() => null);
  return { response, payload };
}

export function getBackendMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const data =
      record.data && typeof record.data === "object"
        ? (record.data as Record<string, unknown>)
        : undefined;
    const message =
      record.message ?? record.error ?? data?.message ?? data?.error;
    if (typeof message === "string") return message;
  }
  return fallback;
}
