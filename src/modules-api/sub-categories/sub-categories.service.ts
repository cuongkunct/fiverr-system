import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';

@Injectable()
export class JobSubCategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateSubCategoryDto) {
    return await this.prisma.jobSubCategories.create({ data });
  }

  async findAll(searchKey: string = '') {
    return await this.prisma.jobSubCategories.findMany({
      where: {
        sub_category_name: { contains: searchKey }
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.jobSubCategories.findUnique({
      where: { id }
    });
  }

  async remove(id: number) {
    return await this.prisma.jobSubCategories.delete({ where: { id } });
  }
}