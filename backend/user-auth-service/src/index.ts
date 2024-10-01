import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());
// const prisma = new PrismaClient();
const app = new Elysia({ prefix: `/api/${process.env.API_VERSION}` })
  .get('/', async() => {
    return { message: 'Hello World' };
  });

app.post('/register', async({ body }) => {
  // const { email } = body;
  const emailtry = 'a313213@gmail.com';
  console.log('check email', emailtry);
  const user = await prisma.user.findUnique({
    where: {
      email: emailtry,
    },
    // cacheStrategy: { ttl: 60 },
  });
  if (user) {
    return { message: 'User already exists' };
  }

  return user;
});

// app.get('/user/:id', async({ params }) => {
//   const { id } = params;
//   const user = await prisma.user.findUnique({
//     where: { id },
//   });
//   return user;
// });

app.listen(3200);

console.log('User Auth Service started at http://localhost:3200');

export default app;
