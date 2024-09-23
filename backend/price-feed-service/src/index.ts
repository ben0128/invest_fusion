import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/', ({ path }) => path) 
  .post('/hello', 'Do you miss me?')
  .listen(3100);

console.log('price-feed-service start at http://localhost:3100');

export default app;