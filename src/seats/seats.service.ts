import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengersService } from '../passengers/passengers.service';
import { Trip } from "../trips/entities/trip.entity";

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    private readonly passengerService: PassengersService,
  ) {}

  create(createSeatDto: CreateSeatDto) {
    const seat = this.seatRepository.create(createSeatDto);
    return this.seatRepository.save(seat);
  }
  async assignToTrip(seatId: number, trip: Trip) {
    const seat = await this.findOne(seatId);
    seat.trip = trip;
    return this.seatRepository.save(seat);
  }

  async assignPassenger(seatId: number, passengerId: number) {
    const seat = await this.findOne(seatId);
    const passenger = this.passengerService.findOne(passengerId);
    seat.passenger = passenger as any;
    return this.seatRepository.save(seat);
  }

  findAll() {
    return this.passengerService.findAll();
  }

  findOne(id: number) {
    const seat = this.seatRepository.findOneBy({
      id: id,
    });
    if (!seat) {
      throw new NotFoundException('Seat not found');
    }
    return seat;
  }

  update(id: number, updateSeatDto: UpdateSeatDto) {
    return `This action updates a #${id} seat`;
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}
