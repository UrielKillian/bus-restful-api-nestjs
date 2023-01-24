import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { DepartmentsService } from '../departments/departments.service';
import { SeatsService } from '../seats/seats.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    private readonly departmentService: DepartmentsService,
    private readonly seatService: SeatsService,
  ) {}
  async create(createTripDto: CreateTripDto) {
    const originPoint = await this.departmentService.findOne(
      createTripDto.originPoint,
    );
    const destinationPoint = await this.departmentService.findOne(
      createTripDto.destinationPoint,
    );
    const trip = await this.tripRepository.create({
      originPoint,
      destinationPoint,
      departureTime: createTripDto.departureTime,
    });
    const savedTrip = await this.tripRepository.save(trip);
    // Creating 15 seats
    const allPromises = () => {
      for (let i = 0; i < 15; i++) {
        let seatId = 0;
        return new Promise((resolve, reject) => {
          const seat = this.seatService
            .create({
              seatNumber: i + 1,
              isBooked: false,
            })
            .then((seat) => {
              resolve(seat);
              seatId = seat.id;
            });
          this.seatService.assignToTrip(seatId, trip);
        });
      }
    };
    await Promise.all([allPromises()]).then(
      (values) => console.log(values),
      (reason) => console.log(reason),
    );
    return savedTrip;
  }

  findAll() {
    return this.tripRepository.find();
  }

  async findOne(id: number) {
    const trip = await this.tripRepository.findOneBy({
      id,
    });
    if (!trip) {
      throw new Error(`Trip with ${id} not found`);
    }
    return trip;
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  async remove(id: number) {
    const trip = await this.findOne(id);
    return this.tripRepository.remove(trip);
  }
}
