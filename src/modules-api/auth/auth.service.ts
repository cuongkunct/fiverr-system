import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  async login(loginDto: LoginDto) {
    const result = await this.prisma.users.findMany();
    return result;
  }

  async register(body: RegisterRequestDto) {
    const { name, email, password, phone, birth_day, gender, role, skill, certification } = body;
    console.log(name, email, password, phone, birth_day, gender, role, skill, certification);

    const userExists = await this.prisma.users.findUnique({ where: { email } });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

  }
}
