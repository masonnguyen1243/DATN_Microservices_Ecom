import cors from "cors";
import express, { Request, Response } from "express";
import { getAuth, clerkMiddleware } from "@clerk/express";

const app = express();

app.use(clerkMiddleware());

app.use(
  cors({
    origin: ["http:localhost:3002", "http:localhost:3003"],
    credentials: true,
  })
);

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "Ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

app.get("/test", (req: Request, res: Response) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  return res.status(200).json({ message: "Product service authenticated!" });
});

app.listen(8000, () => {
  console.log("Product service is running on port http://localhost:8000");
});
