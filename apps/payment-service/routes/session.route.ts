import { Hono } from "hono";
import stripe from "../src/utils/stripe";
import { isUser } from "../src/middleware/authMiddleware";
import { CartItemsType } from "@repo/types";
import { getStripeProductPrice } from "../src/utils/stripeProduct";

const sessionRoute = new Hono();

sessionRoute.post("/create-checkout-session", isUser, async (c) => {
  const { cart }: { cart: CartItemsType } = await c.req.json();
  const userId = c.get("userId");

  const lineItems = await Promise.all(
    cart.map(async (item) => {
      const unitAmount = await getStripeProductPrice(item.id);
      return {
        price_data: {
          currency: "vnd",
          product_data: {
            name: item.name,
          },
          unit_amount: unitAmount as number,
        },
        quantity: item.quantity,
      };
    }),
  );

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      client_reference_id: userId,
      ui_mode: "custom",
      mode: "payment",
      return_url: `http://localhost:3002/complete?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log("Session: ", session);

    return c.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return c.json({ error: error });
  }
});

export default sessionRoute;
