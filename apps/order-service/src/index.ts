import Fastify from "fastify";
import { getAuth, clerkPlugin } from "@clerk/fastify";
import { isUser } from "./middleware/authMiddleware.js";
import { consumer, producer } from "./utils/kafka.js";

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

const start = async () => {
  try {
    Promise.all([await producer.connect(), await consumer.connect()]);

    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port http://localhost:8001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
