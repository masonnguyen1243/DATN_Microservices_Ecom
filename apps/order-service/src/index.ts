import Fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import { isUser } from "./middleware/authMiddleware.js";
import { consumer, producer } from "./utils/kafka.js";
import { connectOrderDB } from "@repo/order-db";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";
import { orderRoutes } from "./routes/order.route.js";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "Ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

fastify.get("/test", { preHandler: isUser }, (request, reply) => {
  return reply.send({
    message: "Order service is authenticated!",
    userId: request.userId,
  });
});

fastify.register(orderRoutes);

const start = async () => {
  try {
    Promise.all([
      await connectOrderDB(),
      await producer.connect(),
      await consumer.connect(),
    ]);
    await runKafkaSubscriptions();
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port 8001!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
