import { createClient } from 'redis';

export const subscriber = createClient();

subscriber.on('error', (err) => console.error('Redis Subscriber Error:', err));

export async function connectRedis() {
  await subscriber.connect();
  console.log("API server connected to Redis");
}