import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

let connection: Promise<typeof redis> | undefined;

export async function getRedis() {
  if (!connection) {
    connection = redis.connect().then(() => redis).catch((err) => {
      connection = undefined;
      throw err;
    });
  }

  return connection;
}