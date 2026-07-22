import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME || 'jigar';
  const adminPassword = process.env.ADMIN_PASSWORD || 'katukda';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@madhur.com';

  const existing = await prisma.user.findUnique({
    where: { username: adminUsername },
  });

  if (existing) {
    console.log(`✓ Admin user "${adminUsername}" already exists — skipping seed.`);
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.create({
    data: {
      username: adminUsername,
      displayName: 'System Administrator',
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log(`✓ Admin user created: ${admin.username} (${admin.email}) [role: ${admin.role}]`);
  console.log(`  Login with: username="${adminUsername}", password="${adminPassword}"`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
