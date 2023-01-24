import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengersService } from '../passengers/passengers.service';
import { TripsService } from '../trips/trips.service';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    private readonly passengerService: PassengersService,
    private readonly tripService: TripsService,
  ) {}

  async create(createSeatDto: CreateSeatDto) {
    const trip = await this.tripService.findOne(createSeatDto.trip);
    const seat = this.seatRepository.create({
      seatNumber: createSeatDto.seatNumber,
      isBooked: createSeatDto.isBooked,
      trip,
    });
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
