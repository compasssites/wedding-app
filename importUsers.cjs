const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parse');
const argon2 = require('argon2');

const prisma = new PrismaClient();

async function importUsers() {
  try {
    const users = [];

    // Read CSV
    fs.createReadStream('./username_passwords.csv')
      .pipe(csv.parse({ columns: true, trim: true }))
      .on('data', (row) => {
        users.push({
          username: row.username,
          password: row.password,
        });
      })
      .on('end', async () => {
        console.log('CSV parsed, importing users...');

        // Clear existing data
        await prisma.$executeRaw`TRUNCATE TABLE "AuthIdentity" RESTART IDENTITY CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE "Auth" RESTART IDENTITY CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;

        for (const user of users) {
          // Hash the password using argon2 to match Wasp’s format
          const hashedPassword = await argon2.hash(user.password, {
            type: argon2.argon2id,
            memoryCost: 19456,
            timeCost: 2,
            parallelism: 1,
          });

          // Create User
          const newUser = await prisma.user.create({
            data: {},
          });

          // Create Auth
          const newAuth = await prisma.auth.create({
            data: {
              id: crypto.randomUUID(), // Use UUID for PostgreSQL
              userId: newUser.id,
            },
          });

          // Create AuthIdentity
          await prisma.authIdentity.create({
            data: {
              providerName: 'username',
              providerUserId: user.username,
              providerData: JSON.stringify({ hashedPassword }),
              authId: newAuth.id,
            },
          });

          console.log(`Imported user: ${user.username}`);
        }

        console.log('Import completed!');
      })
      .on('error', (err) => {
        console.error('Error parsing CSV:', err);
      });
  } catch (error) {
    console.error('Error importing users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importUsers();