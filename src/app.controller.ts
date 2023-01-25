import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTripDto } from './trips/dto/create-trip.dto';
import { CreateTicketDto } from './tickets/dto/create-ticket.dto';
import { CreateTicketAndPassengerDto } from './tickets/dto/create-ticket-passenger.dto';

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

  @Post('/app/ticket')
  createPassengerAndTicket(
    @Body() createTicketDto: CreateTicketAndPassengerDto,
  ) {
    return this.appService.createTicket(
      createTicketDto.seatId,
      createTicketDto.tripId,
      createTicketDto.passengerName,
      createTicketDto.passengerLastName,
      createTicketDto.arrivedTime,
    );
  }
}
