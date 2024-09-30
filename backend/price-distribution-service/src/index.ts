import { Elysia } from 'elysia';
import { kafka, consumer } from './config/kafka';

const app = new Elysia()
  .get('/', () => 'Price Distribution Service')
  .listen(3300);

const userSubscriptions = new Map(); // 存儲用戶訂閱信息

async function setupKafka() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'price-updates', fromBeginning: true });

  await consumer.run({
    eachMessage: async({ message }) => {
      const prices = JSON.parse(message.value?.toString() || '{}');
      distributePrice(prices);
    },
  });
}

function distributePrice(prices: unknown) {
  for (const [userId, subscriptions] of userSubscriptions) {
    const relevantPrices = prices.filter((price: unknown) => subscriptions.includes(price.symbol));
    if (relevantPrices.length > 0) {
      // 向用戶發送相關價格（這裡可以使用 WebSocket 或其他實時通訊方式）
      sendPricesToUser(userId, relevantPrices);
    }
  }
}

function sendPricesToUser(userId: string, prices: unknown[]) {
  // 實現向用戶發送價格的邏輯
  console.log(`Sending prices to user ${userId}:`, prices);
}

setupKafka().catch(console.error);

console.log('Price Dis       tribution Service started at http://localhost:3300');

export default app;
