import { FastifyInstance } from "fastify";
import { isAdmin, isUser } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db";

export const orderRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    "/user-orders",
    { preHandler: isUser },
    async (request, reply) => {
      const orders = await Order.find({ userId: request.userId }).sort({
        createdAt: -1,
      });
      return reply.send(orders);
    },
  );

  fastify.get("/orders", { preHandler: isAdmin }, async (request, reply) => {
    const { limit } = request.query as { limit: number };
    const orders = await Order.find().limit(limit).sort({ createdAt: -1 });
    return reply.send(orders);
  });
};
