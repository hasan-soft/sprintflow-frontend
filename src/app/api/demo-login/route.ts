import { NextResponse } from "next/server";
import { saveAuthSession } from "@/lib/auth-session";
import { getBackendMessage, requestBackendAuth } from "@/lib/backend";

const roles = ["ADMIN", "MANAGER", "MEMBER"] as const;
type DemoRole = (typeof roles)[number];

const credentialsByRole: Record<
  DemoRole,
  { email?: string; password?: string }
> = {
  ADMIN: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  MANAGER: {
    email: process.env.MANAGER_EMAIL,
    password: process.env.MANAGER_PASSWORD,
  },
  MEMBER: {
    email: process.env.MEMBER_EMAIL,
    password: process.env.MEMBER_PASSWORD,
  },
};

export async function POST(request: Request) {
  let body: { role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "A valid demo role is required." },
      { status: 400 },
    );
  }

  if (!roles.includes(body.role as (typeof roles)[number])) {
    return NextResponse.json(
      { error: "A valid demo role is required." },
      { status: 400 },
    );
  }

  const role = body.role as DemoRole;
  const credentials = credentialsByRole[role];
  if (!credentials.email || !credentials.password) {
    return NextResponse.json(
      { error: "Demo credentials are not configured on the server." },
      { status: 503 },
    );
  }

  try {
    const { response, payload } = await requestBackendAuth(
      process.env.BACKEND_AUTH_LOGIN_PATH ?? "/auth/login",
      credentials,
    );
    if (!response.ok)
      return NextResponse.json(
        { error: getBackendMessage(payload, "Demo sign-in failed.") },
        { status: response.status },
      );
    const session = await saveAuthSession(payload, role);
    if (!session)
      return NextResponse.json(
        { error: "The backend response did not include an access token." },
        { status: 502 },
      );
  } catch {
    return NextResponse.json(
      { error: "Could not reach the SprintFlow API." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
