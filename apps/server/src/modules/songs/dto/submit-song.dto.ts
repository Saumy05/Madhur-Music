import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitSongDto {
  @ApiProperty({ example: 'https://youtu.be/dQw4w9WgXcQ', description: 'YouTube video URL' })
  youtubeUrl!: string;

  @ApiPropertyOptional({ description: 'Playlist ID to add the song to immediately' })
  playlistId?: string;

  @ApiPropertyOptional({ description: 'User ID of the submitter' })
  submittedById?: string;
}
