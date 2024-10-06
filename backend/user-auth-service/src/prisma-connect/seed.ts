import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    level: 1,
    email: 'alice@prisma.io',
    walletAddress: ['0x123'],
    assets: ['ETH/eth, ETH/eth'],
  },
  {
    name: 'Nilu',
    level: 2,
    email: 'nilu@prisma.io',
    walletAddress: ['0x456'],
    assets: ['ETH/usdt, ETH/usdc, CARDANO/ada'],
  },
  {
    name: 'admin',
    level: 0,
    email: 'a84012807@gmail.com',
    walletAddress: ['0x789'],
    assets: ['BTC/btc, BTC/usdt'],
  },
];

async function main() {
  console.log('Start seeding ...');
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .then(async() => {
    await prisma.$disconnect();
  })
  .catch(async(e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
