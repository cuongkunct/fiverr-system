import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(createAuthDto: CreateAuthDto) {
    const result = await this.prisma.users.findMany();
    return result;
  }

  register() {
    return `This action returns all auth`;
  }
}
