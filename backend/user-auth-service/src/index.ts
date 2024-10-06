import { Elysia } from 'elysia';
import { errorHandler } from './plugins/errors';
import { auth } from './plugins/auth';

const app = new Elysia({ prefix: `/api/${process.env.API_VERSION}` })
  // .use(errorHandler)
  .onError(({ code,error }) => {
    console.log('code', code, error.message);
    return { message: 'error', error: error.message };
  })

  .use(auth)
  .listen(3200);

console.log('User Auth Service started at http://localhost:3200');

export default app;
