import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendUrl, getBackendMessage } from "@/lib/backend";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const role = cookieStore.get("sprintflow-role")?.value;
  const accessToken = cookieStore.get("sprintflow-access-token")?.value;
  if (!role || !["ADMIN", "MANAGER"].includes(role) || !accessToken) {
    return NextResponse.json(
      { error: "Sign in with an admin or manager account to confirm payment." },
      { status: 403 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const sessionId =
    body && typeof body === "object"
      ? (body as Record<string, unknown>).sessionId
      : undefined;
  if (typeof sessionId !== "string" || !sessionId) {
    return NextResponse.json(
      { error: "A Stripe checkout session ID is required." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(backendUrl("/payments/confirm"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
      cache: "no-store",
    });
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok)
      return NextResponse.json(
        { error: getBackendMessage(payload, "Payment confirmation failed.") },
        { status: response.status },
      );
    return NextResponse.json({
      success: true,
      message: getBackendMessage(payload, "Payment confirmed successfully."),
      data: payload,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the payment confirmation API." },
      { status: 502 },
    );
  }
}
