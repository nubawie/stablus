import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_MAP: Record<string, string> = {
  regulatory: process.env.NEXT_PUBLIC_STRIPE_PRICE_REGULATORY!,
  architecture: process.env.NEXT_PUBLIC_STRIPE_PRICE_ARCHITECTURE!,
  delivery: process.env.NEXT_PUBLIC_STRIPE_PRICE_DELIVERY!,
  prd: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRD!,
  audit: process.env.NEXT_PUBLIC_STRIPE_PRICE_AUDIT!,
  business: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS!,
};

export async function POST(req: NextRequest) {
  try {
    const { serviceId, email, sessionData } = await req.json();
    const priceId = PRICE_MAP[serviceId];
    if (!priceId) return NextResponse.json({ error: "Invalid service" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { serviceId, sessionData: JSON.stringify(sessionData).slice(0, 500) },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/start?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/start?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
