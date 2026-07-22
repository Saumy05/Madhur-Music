import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'Unique username / login ID' })
  username!: string;

  @ApiProperty({ example: 'John Doe', description: 'Display name shown on the platform' })
  displayName!: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  email!: string;

  @ApiProperty({ example: 'StrongPass@123', description: 'Plain-text password (will be hashed)' })
  password!: string;

  @ApiPropertyOptional({ example: 'USER', enum: ['USER', 'ARTIST', 'ADMIN'], description: 'Platform role' })
  role?: 'USER' | 'ARTIST' | 'ADMIN';

  @ApiPropertyOptional({ example: 'https://i.pravatar.cc/150', description: 'Avatar URL' })
  avatarUrl?: string;
}
