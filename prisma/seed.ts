import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const userHash = await argon.hash('secret_user');
  const adminHash = await argon.hash('secret_admin');
  const user = await prisma.user.upsert({
    where: { email: 'user@user.com' },
    update: {},
    create: {
      email: 'user@user.com',
      password: userHash,
      firstName: 'User',
      lastName: 'Seed',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password: adminHash,
      firstName: 'Admin',
      lastName: 'Seed',
      role: 'admin',
    },
  });

  console.log({ user, admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
