import { createClient } from 'redis';

const publisher = createClient();

publisher.on('error', (err) => console.error('Redis Publisher Error:', err));

export async function connectRedis() {
  await publisher.connect();
  console.log("Worker connected to Redis");
}

export async function publishEvent(channel, message) {
  await publisher.publish(channel, JSON.stringify(message));
}
