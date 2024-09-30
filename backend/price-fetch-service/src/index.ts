import { Elysia } from 'elysia';
import { kafka, producer } from './config/kafka';

const app = new Elysia()
  .get('/', () => 'Price Fetcher Service')
  .listen(3100);

async function fetchPrices() {
  // 從各個交易所和區塊鏈獲取價格
  const prices = await fetchPricesFromSources();

  // 發送價格到 Kafka
  await producer.send({
    topic: 'price-updates',
    messages: [{ value: JSON.stringify(prices) }],
  });
}

async function setupKafka() {
  await producer.connect();
  setInterval(fetchPrices, 60000); // 每分鐘獲取一次價格
}

setupKafka().catch(console.error);

console.log('Price Fetcher Service started at http://localhost:3100');

export default app;
