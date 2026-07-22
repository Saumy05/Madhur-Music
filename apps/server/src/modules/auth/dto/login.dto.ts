import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'jigar', description: 'Username / login ID' })
  username!: string;

  @ApiProperty({ example: 'katukda', description: 'Password' })
  password!: string;
}
