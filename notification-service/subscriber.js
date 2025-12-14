const Redis = require('ioredis');
require('dotenv').config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

redis.on("connect", () => {
  console.log("Notification Service connected to Redis");
});

redis.subscribe("user.created", () => {
  console.log("Subscribed to user.created events");
});

redis.on("message", (channel, message) => {
  const data = JSON.parse(message);
  console.log(`Notification sent to ${ data.email }`);
});