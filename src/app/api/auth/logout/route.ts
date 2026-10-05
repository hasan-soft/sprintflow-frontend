import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { clearAuthSession } from "@/lib/auth-session";
import { backendUrl } from "@/lib/backend";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("sprintflow-refresh-token")?.value;
  const accessToken = cookieStore.get("sprintflow-access-token")?.value;
  if (refreshToken) {
    try {
      await fetch(
        backendUrl(process.env.BACKEND_AUTH_LOGOUT_PATH ?? "/auth/logout"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify({ refreshToken }),
          cache: "no-store",
        },
      );
    } catch {
      // Clear the local session even if the backend is unavailable.
    }
  }
  await clearAuthSession();
  return NextResponse.json({ success: true });
}
