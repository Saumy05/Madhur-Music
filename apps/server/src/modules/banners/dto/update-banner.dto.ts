import { ApiProperty } from '@nestjs/swagger';

export class UpdateBannerDto {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  subtitle?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  badgeText?: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty({ required: false })
  ctaText?: string;

  @ApiProperty({ required: false })
  ctaLink?: string;

  @ApiProperty({ required: false })
  order?: number;

  @ApiProperty({ required: false })
  isActive?: boolean;

  @ApiProperty({ required: false })
  targetPage?: string;
}
