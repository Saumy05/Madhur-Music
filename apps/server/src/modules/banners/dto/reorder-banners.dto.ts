import { ApiProperty } from '@nestjs/swagger';

export class ReorderBannersDto {
  @ApiProperty({ example: ['660a1...', '660a2...'], description: 'Ordered list of banner IDs' })
  bannerIds!: string[];
}

