import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.tripRepository.save(trip);
  }
  async findByPoints(start_point: string, end_point: string) {
    if (!start_point || !end_point) {
      throw new Error('Please provide start and end points');
    }
    const trips = await this.tripRepository.find({
      relations: {
        originPoint: true,
        destinationPoint: true,
      },
      where: {
        originPoint: {
          name: start_point,
        },
        destinationPoint: {
          name: end_point,
        },
      },
    });
    if (!trips) {
      throw new NotFoundException('No trips found');
    }
    return trips;
  }

  findAll() {
    return this.tripRepository.find();
  }

  // Create Pagination
  findByPage(page: number, limit: number) {
    return this.tripRepository.find({
      skip: page,
      take: limit,
    });
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
