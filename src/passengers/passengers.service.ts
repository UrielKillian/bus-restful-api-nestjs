import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
  ) {}

  create(createPassengerDto: CreatePassengerDto) {
    const passenger = this.passengerRepository.create(createPassengerDto);
    return this.passengerRepository.save(passenger);
  }

  findAll() {
    return `This action returns all passengers`;
  }

  findOne(id: number) {
    const passenger = this.passengerRepository.findOneBy({
      id: id,
    });
    if (!passenger) {
      throw new NotFoundException('Passenger not found');
    }
    return passenger;
  }

  update(id: number, updatePassengerDto: UpdatePassengerDto) {
    return `This action updates a #${id} passenger`;
  }

  remove(id: number) {
    return `This action removes a #${id} passenger`;
  }
}
