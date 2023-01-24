import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { DepartmentsModule } from '../departments/departments.module';
import { SeatsModule } from '../seats/seats.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), DepartmentsModule, SeatsModule],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}
