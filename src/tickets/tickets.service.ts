import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { SeatsService } from '../seats/seats.service';
import { TripsService } from '../trips/trips.service';
import { PassengersService } from '../passengers/passengers.service';
import { DepartmentsService } from "../departments/departments.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { Repository } from "typeorm";
import { Seat } from "../seats/entities/seat.entity";
import { Trip } from "../trips/entities/trip.entity";
import { Passenger } from "../passengers/entities/passenger.entity";

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly seatsService: SeatsService,
    private readonly tripsService: TripsService,
    private readonly passengersService: PassengersService,
    private readonly departmentService: DepartmentsService,
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    const trip = await this.tripsService.findOne(createTicketDto.tripId);
    const seat = await this.seatsService.findOne(createTicketDto.seatId);
    const passenger = await this.passengersService.findOne(
      createTicketDto.passengerId,
    );
    const ticket = await this.ticketRepository.create({
      passenger: passenger as any,
      trip: trip as Trip,
      seat: seat as Seat,
      arrivalDate: createTicketDto.arrivalDate,
    });
    return this.ticketRepository.save(ticket);
  }

  findAll() {
    return this.ticketRepository.find();
  }

  findOne(id: number) {
    const ticket = this.ticketRepository.findOneBy({
      id: id,
    });
    return ticket;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
