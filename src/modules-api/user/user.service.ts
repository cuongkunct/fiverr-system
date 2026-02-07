import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { UserRequestDto } from './dto/create-user-request.dto';
import * as bcrypt from 'bcrypt';
import { QueryDto, QueryUserPaginationDto } from './dto/query-user.dto';
import { buildQueryPrisma } from 'src/common/helpers/query-pagination.helper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async create(body: UserRequestDto) {
    const { email, password } = body;
    const userExists = await this.prisma.users.findUnique({ where: { email } });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await this.prisma.users.create({
      data: {
        ...body,
        skill: body.skill?.join(','),
        certification: body.certification?.join(','),
        password: hashPassword,
      }
    });
    return user;
  }

  async findAll() {
    const result = await this.prisma.users.findMany();
    return result;
  }

  async searchAll(query: QueryDto) {
    let filters = {};
    try {
      filters = JSON.parse(query.filter);
    } catch (error) {
      filters = {};
    }
    const where = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value && typeof value === "string" && value.trim() !== "") {
        where[key] = {
          contains: value,
        };
      }
    }
    const result = await this.prisma.users.findMany({
      where: where
    });
    return result;
  }

  async searchPagination(query: QueryUserPaginationDto) {
    const { page, pageSize, index, filterValue } = buildQueryPrisma(query);

    const [totalItem, result] = await Promise.all([
      this.prisma.users.count({
        where: filterValue,
      }),
      this.prisma.users.findMany({
        where: filterValue,
        skip: index,
        take: pageSize,
      }),
    ]);
    return {
      page,
      pageSize,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem: totalItem,
      items: result,
    };
  }

  findOne(id: number) {
    const result = this.prisma.users.findUnique({ where: { id } });
    if (!result) throw new BadRequestException('User not found');
    return result;
  }

  async update(id: number, body: UserRequestDto) {
    const { email, password } = body;
    const userExists = await this.prisma.users.findUnique({ where: { email } });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await this.prisma.users.update({
      where: { id },
      data: {
        ...body,
        skill: body.skill?.join(','),
        certification: body.certification?.join(','),
        password: hashPassword,
      }
    });
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new BadRequestException('User not found');
    const result = await this.prisma.users.delete({ where: { id } });
    return result;
  }
}
