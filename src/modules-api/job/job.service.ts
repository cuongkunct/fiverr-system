import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { buildQueryPrisma } from 'src/common/helpers/query-pagination.helper';
import { QueryJobPaginationDto } from './dto/search-job.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) { }
  @Public()
  async create(body: CreateJobDto) {
    return await this.prisma.jobs.create({
      data: body,
    });
  }

  @Public()
  async findAll(query: QueryJobPaginationDto) {
    const { page, pageSize, index, filterValue } = buildQueryPrisma(query);
    const [totalItem, result] = await Promise.all([
      this.prisma.jobs.count({
        where: filterValue,
      }),
      this.prisma.jobs.findMany({
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

  async findOne(id: number) {
    const job = await this.prisma.jobs.findUnique({ where: { id } });
    if (!job) throw new BadRequestException(`Job not found`);
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    const existingJob = await this.prisma.jobs.findUnique({ where: { id } });
    if (!existingJob) throw new BadRequestException(`Job not found`);
    return await this.prisma.jobs.update({
      where: { id },
      data: updateJobDto,
    });
  }

  async remove(id: number) {
    const existingJob = await this.prisma.jobs.findUnique({ where: { id } });
    if (!existingJob) throw new BadRequestException(`Job not found`);
    return await this.prisma.jobs.delete({ where: { id } });
  }
}
