import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('booking')
@ApiTags('Booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  create(@Body() body: CreateBookingDto) {
    return this.bookingService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách đơn đặt (Lọc theo hirer_id)' })
  @ApiQuery({ name: 'hirer_id', required: false, type: Number })
  findAll(@Query('hirer_id') hirerId: number) {
    return this.bookingService.findAll(hirerId ? +hirerId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
