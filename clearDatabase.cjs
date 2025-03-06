const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    await prisma.$executeRaw`DELETE FROM AuthIdentity`;
    await prisma.$executeRaw`DELETE FROM Auth`;
    await prisma.$executeRaw`DELETE FROM User`;
    console.log('Database cleared!');
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();