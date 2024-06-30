import { Elysia } from "elysia";
import { channel } from "./rabbit";
import { createClient } from "redis";
import os from "os";

const client = await createClient({
  url: "redis://redis:6379",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

const app = new Elysia()
  .get("/cache/:id", async ({ params: { id } }) => {
    const value = await client.get(id);
    console.log(os.hostname());

    if (!value) {
      console.log("\nCache Miss");
      let data;

      try {
        const response = await fetch(
          `http://nestjs-app:3000/assinaturas/validaAssinatura/${id}`
        );
        data = await response.json();
      } catch (error) {
        console.error(error);
        return { data: "Fetch Error" };
      }

      
      client.set(id, `${data}`);

      return { data };
    }

    console.log("\nCache Hit");
    return { data: convertBoolean(value) };
  })
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

const queue = "update_cache";

const sla = await channel.assertQueue(queue, { durable: false });
console.log("Waiting for messages in", sla.queue);

channel.consume(queue, (msg) => {
  if (msg) {
    console.log("Received:", msg.content.toString());
    console.log(os.hostname());
    const message = JSON.parse(msg.content.toString()) as {
      pattern: string;
      data: { id: string; value: string };
    };

    switch (message?.pattern) {
      case "flush_cache":
        console.log("Flushing Cache");
        client.flushAll();
        // channel.ack(msg);
        break;
      case "update_cache":
        const { id, value } = message.data;
        client.set(id.toString(), value.toString());
        // channel.ack(msg);
        break;
      default:
        console.log("Unknown Event:", message.pattern);
        // channel.ack(msg);
    }
    console.log("Cache Updated");
  }
}, { noAck: true });

function convertBoolean(value: string) {
  return value === "true" ? true : false;
}
