import { NextResponse } from "next/server";
import { getBackendMessage, requestBackendAuth } from "@/lib/backend";
import { saveAuthSession } from "@/lib/auth-session";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "A Google credential is required." }, { status: 400 });

  try {
    const { response, payload } = await requestBackendAuth(process.env.BACKEND_AUTH_GOOGLE_PATH ?? "/auth/google", body);
    if (!response.ok) return NextResponse.json({ error: getBackendMessage(payload, "Google sign-in failed.") }, { status: response.status });
    const session = await saveAuthSession(payload);
    if (!session) return NextResponse.json({ error: "The backend response did not include a supported role and access token." }, { status: 502 });
    return NextResponse.json({ success: true, role: session.role });
  } catch {
    return NextResponse.json({ error: "Could not reach the SprintFlow API." }, { status: 502 });
  }
}