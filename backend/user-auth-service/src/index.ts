import { Elysia } from 'elysia';
import { prisma } from './prisma-connect/prisma-accelerate';

const app = new Elysia({ prefix: `/api/${process.env.API_VERSION}` })
  .get('/', async() => {
    try {
      const userTable = await prisma.user.count({});
      console.log('userTable', userTable);
      if (userTable > 0) {
        return { message: 'User表存在於MongoDB中' };
      } else {
        return { message: 'User表在MongoDB中不存在或為空' };
      }
    } catch (error) {
      console.error('檢查User表時發生錯誤:', error);
      return { message: '無法確認User表狀態' };
    }
  });

app.post('/register', async() => {
  // const { email } = body;
  const emailtry = 'sds3@gmail.com';
  console.log('check email', emailtry);
  const user = await prisma.user.create({
    data: {
      email: emailtry,
    },
  });
  console.log('user', user);

  return user;
});

app.listen(3200);

console.log('User Auth Service started at http://localhost:3200');

export default app;
