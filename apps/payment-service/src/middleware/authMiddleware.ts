import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import { CustomJwtSessionClaims } from "@repo/types";

export const isUser = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ message: "You are not authenticated!" });
  }

  c.set("userId", auth.userId);

  await next();
});

export const isAdmin = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ message: "You are not authenticated!" });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return c.json({ message: "Not authorized!" });
  }

  c.set("userId", auth.userId);

  await next();
});
