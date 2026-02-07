import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';


@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.prisma.jobCategories.create({ data: createCategoryDto });
    return result;
  }

  async findAll() {
    const result = await this.prisma.jobCategories.findMany();
    return result;
  }

  findOne(id: number) {
    const result = this.prisma.jobCategories.findUnique({ where: { id } });
    if (!result) throw new BadRequestException('Category not found');
    return result;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.prisma.jobCategories.findUnique({ where: { id } });
    if (!category) throw new BadRequestException('Category not found');
    const result = this.prisma.jobCategories.update({ where: { id }, data: updateCategoryDto });
    return result;
  }

  remove(id: number) {
    const category = this.prisma.jobCategories.findUnique({ where: { id } });
    if (!category) throw new BadRequestException('Category not found');
    const result = this.prisma.jobCategories.delete({ where: { id } });
    return result;
  }
}
