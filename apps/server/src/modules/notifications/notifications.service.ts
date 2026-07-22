import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.notification.findMany({
      include: {
        song: {
          include: { artist: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async countUnread() {
    const count = await this.prisma.notification.count({ where: { read: false } });
    return { count };
  }

  async markRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async markAllRead() {
    await this.prisma.notification.updateMany({
      where: { read: false },
      data: { read: true },
    });
    return { message: 'All notifications marked as read.' };
  }
}
