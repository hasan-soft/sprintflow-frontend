import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendUrl } from "@/lib/backend";
import { clearAuthSession } from "@/lib/auth-session";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("sprintflow-refresh-token")?.value;
  const accessToken = cookieStore.get("sprintflow-access-token")?.value;
  if (refreshToken) {
    try {
      await fetch(backendUrl(process.env.BACKEND_AUTH_LOGOUT_PATH ?? "/auth/logout"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });
    } catch {
      // The local session is still cleared if the backend is unavailable.
    }
  }
  await clearAuthSession();
  return NextResponse.json({ success: true });
}