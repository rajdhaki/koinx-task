import { connectRedis, subscriber } from './redisClient.js';
import { storeCryptoStats } from './cryptoService.js';

(async () => {
  await connectRedis();

  await subscriber.subscribe("crypto-update", (message) => {
    console.log("Received event:", message);
    storeCryptoStats();
  });
})();