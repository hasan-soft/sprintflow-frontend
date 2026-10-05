import { NextResponse } from "next/server";
import { saveAuthSession } from "@/lib/auth-session";
import { getBackendMessage, requestBackendAuth } from "@/lib/backend";

export async function POST(request: Request) {
  const credentials: unknown = await request.json().catch(() => null);
  if (!credentials || typeof credentials !== "object") {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const { response, payload } = await requestBackendAuth(
      process.env.BACKEND_AUTH_LOGIN_PATH ?? "/auth/login",
      credentials,
    );
    if (!response.ok)
      return NextResponse.json(
        { error: getBackendMessage(payload, "Unable to sign in.") },
        { status: response.status },
      );
    const session = await saveAuthSession(payload);
    if (!session)
      return NextResponse.json(
        {
          error:
            "The backend response did not include a supported role and access token.",
        },
        { status: 502 },
      );
    return NextResponse.json({
      success: true,
      role: session.role,
      user: session.user,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the SprintFlow API." },
      { status: 502 },
    );
  }
}
