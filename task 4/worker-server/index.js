import { connectRedis, publishEvent } from './redisClient.js';

(async () => {
  await connectRedis();

  setInterval(() => {
    publishEvent("crypto-update", { trigger: "update" });
    console.log("Published update event");
  }, 15 * 60 * 1000); // 15 minutes

  // For quick testing:
  publishEvent("crypto-update", { trigger: "update" });
})();
