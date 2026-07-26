import { Injectable, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService implements OnModuleInit {
  private readonly logger = new Logger('BannersService');

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    try {
      const count = await this.prisma.banner.count();
      if (count === 0) {
        this.logger.log('Seeding initial default banners…');
        await this.prisma.banner.createMany({
          data: [
            {
              title: 'Hi-Res Audio Headroom Calibrator',
              subtitle: 'Dolby Spatial Soundstage Staging',
              description: 'Optimize your headphones with our custom 10-band spatial hardware equalizer profiles.',
              badgeText: 'Dolby Spatial',
              imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80',
              ctaText: 'Calibrate Staging',
              ctaLink: '/listener/spatial-calibrator',
              order: 0,
              isActive: true,
              targetPage: 'HOME',
            },
            {
              title: 'Exclusive Backstage Pass & VIP Rewards',
              subtitle: 'Connect Directly with Underground Artists',
              description: 'Unlock unreleased studio stems, join live acoustic jam rooms, and earn vinyl rewards.',
              badgeText: 'VIP Access',
              imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&auto=format&fit=crop&q=80',
              ctaText: 'Explore VIP Benefits',
              ctaLink: '/listener/pricing',
              order: 1,
              isActive: true,
              targetPage: 'HOME',
            },
            {
              title: 'Live Concert & Festival Tour Radar',
              subtitle: 'Real-Time Box Office Ticketing',
              description: 'Find acoustic indie concerts, electronic raves, and jazz club sessions happening near you.',
              badgeText: 'Concert Radar',
              imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&auto=format&fit=crop&q=80',
              ctaText: 'Find Nearby Concerts',
              ctaLink: '/listener/concerts',
              order: 2,
              isActive: true,
              targetPage: 'HOME',
            },
          ],
        });
        this.logger.log('✓ Default banners seeded into database.');
      }
    } catch (err) {
      this.logger.error('Failed seeding default banners:', err);
    }
  }

  /** Public endpoint: fetch active banners ordered by sequence */
  async findAll(targetPage = 'HOME') {
    return this.prisma.banner.findMany({
      where: {
        isActive: true,
        targetPage: targetPage.toUpperCase(),
      },
      orderBy: { order: 'asc' },
    });
  }

  /** Admin endpoint: fetch all banners (active & inactive) */
  async findAllAdmin() {
    return this.prisma.banner.findMany({
      orderBy: [
        { targetPage: 'asc' },
        { order: 'asc' },
      ],
    });
  }

  async findOne(id: string) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundException(`Banner "${id}" not found`);
    return banner;
  }

  async create(dto: CreateBannerDto) {
    const highestOrder = await this.prisma.banner.findFirst({
      where: { targetPage: dto.targetPage || 'HOME' },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const nextOrder = dto.order ?? ((highestOrder?.order ?? -1) + 1);

    return this.prisma.banner.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description,
        badgeText: dto.badgeText,
        imageUrl: dto.imageUrl,
        ctaText: dto.ctaText,
        ctaLink: dto.ctaLink,
        order: nextOrder,
        isActive: dto.isActive ?? true,
        targetPage: (dto.targetPage || 'HOME').toUpperCase(),
      },
    });
  }

  async update(id: string, dto: UpdateBannerDto) {
    await this.findOne(id);

    const data: any = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.subtitle !== undefined) data.subtitle = dto.subtitle;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.badgeText !== undefined) data.badgeText = dto.badgeText;
    if (dto.imageUrl !== undefined) data.imageUrl = dto.imageUrl;
    if (dto.ctaText !== undefined) data.ctaText = dto.ctaText;
    if (dto.ctaLink !== undefined) data.ctaLink = dto.ctaLink;
    if (dto.order !== undefined) data.order = dto.order;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    if (dto.targetPage !== undefined) data.targetPage = dto.targetPage.toUpperCase();

    return this.prisma.banner.update({
      where: { id },
      data,
    });
  }

  async reorder(bannerIds: string[]) {
    const updates = bannerIds.map((id, index) =>
      this.prisma.banner.update({
        where: { id },
        data: { order: index },
      }),
    );
    await Promise.all(updates);
    return { message: 'Banners reordered successfully' };
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.banner.delete({ where: { id } });
    return { message: 'Banner deleted successfully' };
  }
}
