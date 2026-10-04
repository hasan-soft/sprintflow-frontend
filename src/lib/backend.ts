const backendApiBase = process.env.NEXT_PUBLIC_API_URL
  ?? `${process.env.BACKEND_URL ?? "https://sprintflow-backend.vercel.app"}${process.env.BACKEND_API_PREFIX ?? "/api/v1"}`;

export function backendUrl(path: string) {
  return `${backendApiBase.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export async function requestBackendAuth(path: string, body: unknown) {
  const response = await fetch(backendUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const payload: unknown = await response.json().catch(() => null);
  return { response, payload };
}

export function getBackendMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const data = record.data && typeof record.data === "object" ? record.data as Record<string, unknown> : undefined;
    const message = record.message ?? record.error ?? data?.message ?? data?.error;
    if (typeof message === "string") return message;
  }
  return fallback;
}