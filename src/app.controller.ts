import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTripDto } from './trips/dto/create-trip.dto';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  createTripAndSeats(@Body() createTripDto: CreateTripDto) {
    return this.appService.createTripAndSeats(
      +createTripDto.originPoint,
      +createTripDto.destinationPoint,
      createTripDto.departureTime,
      15,
    );
  }
}
