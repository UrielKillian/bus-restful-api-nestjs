import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { DepartmentsModule } from '../departments/departments.module';
import { TripsModule } from '../trips/trips.module';
import { PassengersModule } from '../passengers/passengers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    DepartmentsModule,
    TripsModule,
    PassengersModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
