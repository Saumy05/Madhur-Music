import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** Strip the password hash before returning to clients */
  private sanitize(user: any) {
    const { passwordHash: _, ...safe } = user;
    return safe;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users.map(this.sanitize);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User "${id}" not found`);
    return this.sanitize(user);
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(dto: CreateUserDto) {
    const [existingEmail, existingUsername] = await Promise.all([
      this.prisma.user.findUnique({ where: { email: dto.email } }),
      this.prisma.user.findUnique({ where: { username: dto.username } }),
    ]);

    if (existingEmail) throw new ConflictException('Email already in use');
    if (existingUsername) throw new ConflictException('Username already in use');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        displayName: dto.displayName,
        email: dto.email,
        passwordHash,
        role: (dto.role as any) ?? 'USER',
        avatarUrl: dto.avatarUrl,
      },
    });

    return this.sanitize(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id); // throws if not found

    const data: any = {};
    if (dto.username) data.username = dto.username;
    if (dto.displayName) data.displayName = dto.displayName;
    if (dto.email) data.email = dto.email;
    if (dto.role) data.role = dto.role;
    if (dto.avatarUrl !== undefined) data.avatarUrl = dto.avatarUrl;
    if (dto.password) {
      data.passwordHash = await bcrypt.hash(dto.password, 12);
    }

    const user = await this.prisma.user.update({ where: { id }, data });
    return this.sanitize(user);
  }

  async remove(id: string) {
    await this.findOne(id); // throws if not found
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
  }
}
