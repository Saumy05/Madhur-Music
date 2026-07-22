import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
  @ApiProperty({
    description: 'The title of the song',
    example: 'Midnight Echoes',
  })
  title!: string;

  @ApiProperty({
    description: 'The name of the artist',
    example: 'Luna Ray',
  })
  artistName!: string;

  @ApiProperty({
    description: 'The name of the album (optional)',
    example: 'Studio Sessions',
    required: false,
  })
  albumTitle?: string;

  @ApiProperty({
    description: 'Song duration in seconds',
    example: 134,
  })
  durationSec!: number;

  @ApiProperty({
    description: 'Direct audio URL or YouTube streaming video URL',
    example: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  })
  audioUrl!: string;

  @ApiProperty({
    description: 'Cover art image URL (optional)',
    example: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    required: false,
  })
  coverUrl?: string;

  @ApiProperty({
    description: 'Explicit content flag',
    example: false,
    required: false,
    default: false,
  })
  explicit?: boolean;
}
