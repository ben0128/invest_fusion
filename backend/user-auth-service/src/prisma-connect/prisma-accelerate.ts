import { PrismaClient } from '@prisma/client';

import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
  // return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

prisma.$connect()
  .then(() => {
    console.log('成功連接到數據庫');
  })
  .catch((e) => {
    console.error('無法連接到數據庫:', e);
  });

export { prisma };
