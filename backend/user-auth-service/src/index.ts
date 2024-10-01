import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = new Elysia();

app.post('/register', async({ body }) => {
  const { email, name, password } = body;
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password, // 注意: 實際應用中應該對密碼進行加密
    },
  });
  return user;
});

app.get('/user/:id', async({ params }) => {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
});

app.listen(3200);

console.log('User Auth Service started at http://localhost:3200');
