import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'janedoe' })
  username?: string;

  @ApiPropertyOptional({ example: 'Jane Doe' })
  displayName?: string;

  @ApiPropertyOptional({ example: 'jane@example.com' })
  email?: string;

  @ApiPropertyOptional({ example: 'NewPass@456', description: 'Leave empty to keep current password' })
  password?: string;

  @ApiPropertyOptional({ enum: ['USER', 'ARTIST', 'ADMIN'] })
  role?: 'USER' | 'ARTIST' | 'ADMIN';

  @ApiPropertyOptional()
  avatarUrl?: string;
}
