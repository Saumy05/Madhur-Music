import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('PrismaService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to MongoDB database');

    try {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@madhur.com';

      if (adminUsername && adminPassword) {
        const existing = await this.user.findUnique({
          where: { username: adminUsername },
        });

        if (!existing) {
          const passwordHash = await bcrypt.hash(adminPassword, 12);
          await this.user.create({
            data: {
              username: adminUsername,
              displayName: 'System Administrator',
              email: adminEmail,
              passwordHash,
              role: 'ADMIN',
            },
          });
          this.logger.log(`✓ Auto-seeded admin user "${adminUsername}" into MongoDB.`);
        }
      }
    } catch (e) {
      this.logger.error('Failed auto-seeding admin user:', e);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
