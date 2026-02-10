import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, UploadedFile, BadRequestException, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from './dto/create-user-request.dto';
import { UserResponseDto } from './dto/create-user-response.dto';
import { QueryDto, QueryUserPaginationDto } from './dto/query-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './../../modules-system/cloudinary/cloudinary.service';
import { FileUploadDto } from './dto/upload-file.dto';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/modules-system/prisma/generated/prisma/client';



@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Get all users success' })
  findAll() {
    return this.userService.findAll();
  }

  @Post('upload-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Body() body: FileUploadDto, @User() user: any, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 2097152 }), // Kiểm tra cho phép tối đa 2mb/ kiểm tra empty lun
      new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }), // Giới hạn các file được nhận
    ],
  })) file: Express.Multer.File): Promise<UserResponseDto> {
    const result = await this.userService.uploadAvatar(user, body, file);
    return new UserResponseDto(result as UserResponseDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Create user success' })
  async create(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    const result = await this.userService.create(body);
    return new UserResponseDto(result as UserResponseDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Get all users success' })
  searchAll(
    @Query()
    query: QueryDto,
  ) {
    return this.userService.searchAll(query);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Find one user using id' })
  @ApiResponse({ status: 200, description: 'Find one user using id success' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const result = await this.userService.findOne(+id);
    return new UserResponseDto(result as UserResponseDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user using id' })
  @ApiResponse({ status: 200, description: 'Update user using id success' })
  async update(@Param('id') id: string, @Body() body: UserRequestDto): Promise<UserResponseDto> {
    const result = await this.userService.update(+id, body);
    return new UserResponseDto(result as UserResponseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove user using id' })
  @ApiResponse({ status: 200, description: 'Remove user using id success' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
