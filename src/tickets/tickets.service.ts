import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { SeatsService } from '../seats/seats.service';
import { TripsService } from '../trips/trips.service';
import { PassengersService } from '../passengers/passengers.service';
import { DepartmentsService } from "../departments/departments.service";

@Injectable()
export class TicketsService {
  constructor(
    private readonly seatsService: SeatsService,
    private readonly tripsService: TripsService,
    private readonly passengersService: PassengersService,
    private readonly departmentService: DepartmentsService
  ) {}
  create(createTicketDto: CreateTicketDto) {
    const trip = this.tripsService.findOne(createTicketDto.tripId);
    const seat = this.seatsService.findOne(createTicketDto.seatId);
    const passenger = this.passengersService.findOne(
      createTicketDto.passengerId,
    );
    const originPoint = this.departmentService.findOne();
    const ticket = {
      originPoint
      destinationPoint
      departureTime
      arrivalDate
      passenger: passenger,
      seat: seat,
    }
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
