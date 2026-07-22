import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    let user = await this.usersService.findByUsername(username);

    // Dynamic auto-seed fallback if DB is empty / clean (reads strictly from process.env)
    const configuredAdminUsername = process.env.ADMIN_USERNAME;
    const configuredAdminPassword = process.env.ADMIN_PASSWORD;

    if (
      !user &&
      configuredAdminUsername &&
      configuredAdminPassword &&
      username === configuredAdminUsername &&
      password === configuredAdminPassword
    ) {
      user = await this.usersService.createAdminUser(username, password);
    }

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    };
  }
}
