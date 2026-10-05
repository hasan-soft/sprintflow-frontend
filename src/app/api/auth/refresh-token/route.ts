import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { saveAuthSession } from "@/lib/auth-session";
import { getBackendMessage, requestBackendAuth } from "@/lib/backend";

export async function POST() {
  const refreshToken = (await cookies()).get("sprintflow-refresh-token")?.value;
  if (!refreshToken) {
    return NextResponse.json(
      { error: "Your session has expired. Sign in again." },
      { status: 401 },
    );
  }

  try {
    const { response, payload } = await requestBackendAuth(
      process.env.BACKEND_AUTH_REFRESH_PATH ?? "/auth/refresh-token",
      { refreshToken },
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: getBackendMessage(payload, "Session refresh failed.") },
        { status: response.status },
      );
    }
    const session = await saveAuthSession(payload);
    if (!session) {
      return NextResponse.json(
        { error: "The backend returned an invalid refreshed session." },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true, role: session.role });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the SprintFlow API." },
      { status: 502 },
    );
  }
}
