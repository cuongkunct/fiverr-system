import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from './dto/create-user-request.dto';
import { UserResponseDto } from './dto/create-user-response.dto';
import { QueryDto, QueryUserPaginationDto } from './dto/query-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/role.decorator';


@Controller('user')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Get all users success' })
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Create user success' })
  async create(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    const result = await this.userService.create(body);
    return new UserResponseDto(result as UserResponseDto);
  }

  @Get('search')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Get all users success' })
  searchAll(
    @Query()
    query: QueryDto,
  ) {
    return this.userService.searchAll(query);
  }

  @Get('searchPagination')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Get all users success' })
  searchPagination(
    @Query()
    query: QueryUserPaginationDto,
  ) {
    return this.userService.searchPagination(query);
  }


  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Find one user using id' })
  @ApiResponse({ status: 200, description: 'Find one user using id success' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const result = await this.userService.findOne(+id);
    return new UserResponseDto(result as UserResponseDto);
  }

  @Patch(':id')
  @Public()
  @ApiOperation({ summary: 'Update user using id' })
  @ApiResponse({ status: 200, description: 'Update user using id success' })
  async update(@Param('id') id: string, @Body() body: UserRequestDto): Promise<UserResponseDto> {
    const result = await this.userService.update(+id, body);
    return new UserResponseDto(result as UserResponseDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remove user using id' })
  @ApiResponse({ status: 200, description: 'Remove user using id success' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
