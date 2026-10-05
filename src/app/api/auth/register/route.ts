import { NextResponse } from "next/server";
import { getBackendMessage, requestBackendAuth } from "@/lib/backend";

export async function POST(request: Request) {
  const details: unknown = await request.json().catch(() => null);
  if (!details || typeof details !== "object") {
    return NextResponse.json(
      { error: "Registration details are required." },
      { status: 400 },
    );
  }

  try {
    const { response, payload } = await requestBackendAuth(
      process.env.BACKEND_AUTH_REGISTER_PATH ?? "/auth/register",
      details,
    );
    if (!response.ok)
      return NextResponse.json(
        { error: getBackendMessage(payload, "Unable to create the account.") },
        { status: response.status },
      );
    return NextResponse.json(
      {
        success: true,
        message: getBackendMessage(
          payload,
          "Account created. Check your inbox to verify your email.",
        ),
      },
      { status: response.status },
    );
  } catch {
    return NextResponse.json(
      { error: "Could not reach the SprintFlow API." },
      { status: 502 },
    );
  }
}
