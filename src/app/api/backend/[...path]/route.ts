import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/lib/backend";

async function proxyBackend(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const subpath = path.join("/");
  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(backendUrl(subpath));
  upstreamUrl.search = incomingUrl.search;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sprintflow-access-token")?.value;

  if (subpath === "users/me" && !accessToken) {
    return NextResponse.json(
      { success: false, data: null, message: "Unauthenticated" },
      { status: 401 },
    );
  }

  const headers = new Headers({
    Accept: request.headers.get("accept") ?? "application/json",
  });
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  if (accessToken) headers.set("authorization", `Bearer ${accessToken}`);

  try {
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.arrayBuffer(),
      cache: "no-store",
    });

    let status = upstream.status;
    const bodyText = await upstream.text();

    if (
      status === 500 &&
      subpath === "users/me" &&
      (bodyText.includes("You are not logged in") ||
        bodyText.includes("jwt malformed") ||
        bodyText.includes("invalid signature") ||
        bodyText.includes("jwt expired"))
    ) {
      status = 401;
    }

    const responseHeaders = new Headers();
    const responseType = upstream.headers.get("content-type");
    if (responseType) responseHeaders.set("content-type", responseType);
    return new Response(bodyText, {
      status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the SprintFlow API." },
      { status: 502 },
    );
  }
}

export const GET = proxyBackend;
export const POST = proxyBackend;
export const PUT = proxyBackend;
export const PATCH = proxyBackend;
export const DELETE = proxyBackend;
