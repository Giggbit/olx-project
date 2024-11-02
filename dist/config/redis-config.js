import { createClient } from "redis";
const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
(async () => {
    await redisClient.connect();
    console.log("Connected to Redis");
})();
export default redisClient;
