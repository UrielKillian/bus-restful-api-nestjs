import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { PassengersModule } from '../passengers/passengers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seat]), PassengersModule],
  controllers: [SeatsController],
  providers: [SeatsService],
  exports: [SeatsService],
})
export class SeatsModule {}
