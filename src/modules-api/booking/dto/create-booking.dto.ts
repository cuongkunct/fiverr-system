import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsInt, IsNotEmpty } from "class-validator"

export class CreateBookingDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  job_id: number

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  hirer_id: number

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  is_completed: boolean
}
