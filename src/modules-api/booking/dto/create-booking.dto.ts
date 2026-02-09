import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @ApiProperty({ example: 1, description: 'ID của công việc' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  job_id: number;

  @ApiProperty({ example: 1, description: 'ID của người thuê' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  hirer_id: number;

  @ApiProperty({ example: true, description: 'Trạng thái hoàn thành' })
  @IsNotEmpty()
  @IsBoolean()
  is_completed: boolean;
}