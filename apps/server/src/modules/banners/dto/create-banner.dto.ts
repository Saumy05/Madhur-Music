import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty({ example: 'Hi-Res Audio Headroom Calibrator' })
  title!: string;

  @ApiProperty({ example: '24-bit 192kHz Spatial Soundstage', required: false })
  subtitle?: string;

  @ApiProperty({ example: 'Optimize your headphones with our custom 10-band spatial hardware equalizer profiles.' })
  description!: string;

  @ApiProperty({ example: 'Dolby Spatial', required: false })
  badgeText?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600', required: false })
  imageUrl?: string;

  @ApiProperty({ example: 'Calibrate Staging', required: false })
  ctaText?: string;

  @ApiProperty({ example: '/listener/spatial-calibrator', required: false })
  ctaLink?: string;

  @ApiProperty({ example: 0, required: false })
  order?: number;

  @ApiProperty({ example: true, required: false })
  isActive?: boolean;

  @ApiProperty({ example: 'HOME', required: false })
  targetPage?: string;
}

