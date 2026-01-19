import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { getAuth, clerkMiddleware } from "@clerk/express";
import { isUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";

const app = express();

app.use(express.json());
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

app.get("/test", isUser, (req: Request, res: Response) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  return res
    .status(200)
    .json({ message: "Product service authenticated!", userId: userId });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error!" });
});

app.listen(8000, () => {
  console.log("Product service is running on port http://localhost:8000");
});
