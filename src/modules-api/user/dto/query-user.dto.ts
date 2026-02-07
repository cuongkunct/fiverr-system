import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Query } from '@nestjs/common';

export class QueryDto {
  @ApiPropertyOptional({ example: '{"name": "", "phone": "", "email: ""}' })
  @IsOptional()
  @IsString()
  filter: string;
}

export class QueryUserPaginationDto {
  @ApiPropertyOptional({ example: '{"name": "", "phone": "", "email: ""}' })
  @IsOptional()
  @IsString()
  filters: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsString()
  page: string;

  @ApiPropertyOptional({ example: '3' })
  @IsOptional()
  @IsString()
  pageSize: string;
}