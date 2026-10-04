import Stripe from "stripe";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const role = (await cookies()).get("sprintflow-role")?.value;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access is required." }, { status: 403 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey?.startsWith("sk_test_")) {
    return NextResponse.json({ error: "Configure a Stripe test-mode secret key to start checkout." }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{
      price_data: {
        currency: "usd",
        unit_amount: 4900,
        recurring: { interval: "month" },
        product_data: { name: "SprintFlow Team" },
      },
      quantity: 1,
    }],
    success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/payment/cancel`,
  });

  return NextResponse.json({ url: session.url });
}