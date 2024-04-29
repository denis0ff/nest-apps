import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashData(password: string) {
  return await bcrypt.hash(password, 1e9);
}

const userData: Prisma.UserCreateInput[] = [
  {
    username: 'test_user_1',
    password: 'test_user_1',
    role: 'USER',
  },
  {
    username: 'test_organizer_1',
    password: 'test_organizer_1',
    role: 'ORGANIZER',
  },
  {
    username: 'test_admin',
    password: 'test_admin',
    role: 'ADMIN',
  },
];

async function main() {
  userData.forEach(async (data) => {
    data.password = await hashData(data.username);

    const user = await prisma.user.create({
      data,
    });

    console.log(`Created user with id: ${user.id}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
