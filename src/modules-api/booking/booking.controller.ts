import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';

@Controller('booking')
@ApiTags('Booking')
@ApiBearerAuth('JWT-auth')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  @ApiOperation({ summary: 'Create new booking' })
  create(@Body() body: CreateBookingDto) {
    return this.bookingService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all booking by hirer_id' })
  @ApiQuery({ name: 'hirer_id', required: false, type: Number })
  @Public()
  findAll(@Query('hirer_id') hirerId: number) {
    return this.bookingService.findAll(hirerId ? +hirerId : undefined);
  }

  @Get('booked')
  @ApiOperation({ summary: 'Get all booking by hirer' })
  findAllByHirer(@User() user: any) {
    return this.bookingService.findAllByHirer(user);
  }

  @Get(':id')
  @Public()
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
