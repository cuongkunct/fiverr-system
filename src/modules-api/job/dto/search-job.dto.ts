import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class QueryJobPaginationDto {
  @ApiPropertyOptional({ example: '{"job_name": "", "description": "", "short_description: ""}' })
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