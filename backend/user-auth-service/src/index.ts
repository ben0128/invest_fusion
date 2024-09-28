import { Elysia } from 'elysia';
import { kafka, producer, consumer } from './config/kafka';

const app = new Elysia()
    .get('/', ({ path }) => path) 
    .post('/hello', 'Do you miss me?')
    .listen(3200);

async function setupKafka() {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value?.toString(),
      });
    },
  });
}

setupKafka().catch(console.error);
    
console.log('user-auth-service start at http://localhost:3200');

export default app;