import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { backendUrl, getBackendMessage } from "@/lib/backend";

const roles = new Set(["ADMIN", "MANAGER"]);
const plans = new Set(["PRO", "ENTERPRISE"]);

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const role = cookieStore.get("sprintflow-role")?.value;
  const accessToken = cookieStore.get("sprintflow-access-token")?.value;
  if (!role || !roles.has(role) || !accessToken) {
    return NextResponse.json(
      { error: "Sign in with an admin or manager account to continue." },
      { status: 403 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Organization and plan are required." },
      { status: 400 },
    );
  }
  const { organizationId, plan } = body as Record<string, unknown>;
  if (
    typeof organizationId !== "string" ||
    !organizationId ||
    typeof plan !== "string" ||
    !plans.has(plan)
  ) {
    return NextResponse.json(
      { error: "Choose an organization and a paid plan." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      backendUrl(
        process.env.BACKEND_PAYMENT_INITIATE_PATH ?? "/payments/initiate",
      ),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organizationId, plan }),
        cache: "no-store",
      },
    );
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok)
      return NextResponse.json(
        { error: getBackendMessage(payload, "Could not start checkout.") },
        { status: response.status },
      );

    const root =
      payload && typeof payload === "object"
        ? (payload as Record<string, unknown>)
        : {};
    const data =
      root.data && typeof root.data === "object"
        ? (root.data as Record<string, unknown>)
        : {};
    const checkoutUrl = data.checkoutUrl ?? root.checkoutUrl;
    const sessionId = data.sessionId ?? root.sessionId;
    if (typeof checkoutUrl !== "string" || typeof sessionId !== "string") {
      return NextResponse.json(
        { error: "The payment API returned an incomplete checkout session." },
        { status: 502 },
      );
    }
    return NextResponse.json({ checkoutUrl, sessionId });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the SprintFlow payment API." },
      { status: 502 },
    );
  }
}
