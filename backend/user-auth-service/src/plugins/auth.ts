import { Elysia, NotFoundError, ParseError, ValidationError } from 'elysia';

// 自定義錯誤類型
class AuthError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = 'AuthError';
  }
}

export const auth = new Elysia()
  .get('/user', async({ set }) => {
    set.status = 200;
    return { message: 'user' };
  })
  .get('/errornew', async() => {
    // 使用 Elysia 的內建錯誤處理
    // set.status = 405;
    throw new NotFoundError();
  });
