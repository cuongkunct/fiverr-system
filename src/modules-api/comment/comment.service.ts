import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }
  async create(body: CreateCommentDto) {
    const result = await this.prisma.comments.create({
      data: body
    });
    return result;
  }

  async findAll(job_id?: number) {
    const result = await this.prisma.comments.findMany({
      where: job_id ? { job_id: job_id } : {},
      orderBy: { create_date: 'desc' },
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.comments.findUnique({ where: { id } });
    if (!result) throw new BadRequestException('Comment not found');
    return result;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = this.prisma.comments.findUnique({ where: { id } });
    if (!comment) throw new BadRequestException('Comment not found');
    const result = this.prisma.comments.update({ where: { id }, data: updateCommentDto });
    return result;
  }

  remove(id: number) {
    const comment = this.prisma.comments.findUnique({ where: { id } });
    if (!comment) throw new BadRequestException('Comment not found');
    const result = this.prisma.comments.delete({ where: { id } });
    return result;
  }
}
