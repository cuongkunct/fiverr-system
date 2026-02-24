import { Controller, Get, Post, Body, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JobSubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('JobSubCategories')
@Controller('job-sub-categories')
export class JobSubCategoriesController {
  constructor(private readonly service: JobSubCategoriesService) { }

  @Post()
  @ApiOperation({ summary: 'Create job sub category' })
  @Public()
  create(@Body() createDto: CreateSubCategoryDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job sub categories' })
  @ApiQuery({ name: 'searchKey', required: false, description: 'Search key to find job sub categories' })
  @Public()
  findAll(@Query('searchKey') searchKey?: string) {
    return this.service.findAll(searchKey);
  }

  // @Post('upload-image')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('file'))
  // @Public()
  // async uploadImage(@Body() body: FileUploadDto, @User() user: any, @UploadedFile(new ParseFilePipe({
  //   validators: [
  //     new MaxFileSizeValidator({ maxSize: 2097152 }), // Kiểm tra cho phép tối đa 2mb/ kiểm tra empty
  //     new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }), // Giới hạn các file được nhận
  //   ],
  // })) file: Express.Multer.File): Promise<UserResponseDto> {
  //   const result = await this.userService.uploadAvatar(user, body, file);
  //   return new UserResponseDto(result as UserResponseDto);
  // }


  @Get(':id')
  @ApiOperation({ summary: 'Get job sub category by id' })
  @Public()
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove job sub category' })
  @Public()
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}