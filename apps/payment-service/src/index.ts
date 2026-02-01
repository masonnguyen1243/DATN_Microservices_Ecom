import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getAuth, clerkMiddleware } from "@hono/clerk-auth";
import { isUser } from "./middleware/authMiddleware.js";
import sessionRoute from "../routes/session.route.js";
import { cors } from "hono/cors";
import stripe from "./utils/stripe.js";

const app = new Hono();

app.use("*", clerkMiddleware());
app.use(
  "*",
  cors({
    origin: "http://localhost:3002",
  }),
);

app.get("/health", (c) => {
  return c.json({
    status: "Ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

app.route("/sessions", sessionRoute);

app.get("/test", isUser, (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "Not authorized!",
    });
  }

  return c.json({
    message: "Payment service is authorized!",
    userId: c.get("userId"),
  });
});

app.post("/create-stripe-product", async (c) => {
  const res = await stripe.products.create({
    id: "123",
    name: "test 123",
    default_price_data: {
      currency: "vnd",
      unit_amount: 123000,
    },
  });

  return c.json(res);
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(
          `Payment service is running on http://localhost:${info.port}`,
        );
      },
    );
  } catch (error) {
    console.log("Error starting the server:", error);
    process.exit(1);
  }
};

start();
