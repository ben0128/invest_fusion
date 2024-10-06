import { Elysia } from 'elysia';
// import { CustomError } from '../errors';  // 假設有自定義錯誤類

class CustomError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
  }
}

export const errorHandler = new Elysia()
  .onError(({ code, error, set }) => {
    console.error(`錯誤發生: ${code}`, error);

    if (error instanceof CustomError) {
      set.status = 300;
      console.log('custom error', error);
      return { message: '自定義錯誤', error: error.message };
    }
    console.log('checkout dfdf5909');
    switch (code) {
    case 'NOT_FOUND':
      set.status = 404;
      return { message: '找不到資源', error: error.message };
    case 'VALIDATION':
      set.status = 400;
      return { message: '驗證錯誤', error: error.message };
    default:
      set.status = 500;
      console.log('checkout 500');
      return { message: '內部伺服器錯誤', error: '發生未知錯誤' };
    }
  });
