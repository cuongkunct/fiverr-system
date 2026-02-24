import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { QueryJobPaginationDto } from './dto/search-job.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';


@Controller('job')
@ApiTags('Jobs')
// @ApiBearerAuth('JWT-auth') 
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @Post()
  @ApiOperation({ summary: 'Create new job' })
  @ApiResponse({ status: 200, description: 'Create new job success' })
  @Public()
  create(@Body() body: CreateJobDto) {
    return this.jobService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'Get all jobs success' })
  @Public()
  findAll() {
    return this.jobService.findAll();
  }

  @Get('searchPagination')
  @ApiOperation({ summary: 'Search jobs with pagination by query job name or job description' })
  @ApiResponse({ status: 200, description: 'Search jobs success' })
  @Public()
  searchPagination(@Query() query: QueryJobPaginationDto) {
    return this.jobService.searchPagination(query);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
