import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendUrl, getBackendMessage } from "@/lib/backend";

export async function POST() {
  const role = (await cookies()).get("sprintflow-role")?.value;
  if (role !== "ADMIN") {
    return NextResponse.json(
      { error: "Admin access is required." },
      { status: 403 },
    );
  }

  const accessToken = (await cookies()).get("sprintflow-access-token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Your admin session has expired. Sign in again to continue." }, { status: 401 });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  try {
    const response = await fetch(backendUrl(process.env.BACKEND_PAYMENT_CHECKOUT_PATH ?? "/payments/checkout"), {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ plan: "TEAM", successUrl: `${origin}/payment/success`, cancelUrl: `${origin}/payment/cancel` }),
      cache: "no-store",
    });
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok) return NextResponse.json({ error: getBackendMessage(payload, "Could not start checkout.") }, { status: response.status });

    const root = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};
    const data = root.data && typeof root.data === "object" ? root.data as Record<string, unknown> : {};
    const session = root.session && typeof root.session === "object" ? root.session as Record<string, unknown> : {};
    const url = root.url ?? root.checkoutUrl ?? data.url ?? data.checkoutUrl ?? session.url;
    if (typeof url !== "string") return NextResponse.json({ error: "The payment API did not return a checkout URL." }, { status: 502 });
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Could not reach the SprintFlow payment API." }, { status: 502 });
  }
}
