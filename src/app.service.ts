import { Injectable } from '@nestjs/common';
import { SeatsService } from './seats/seats.service';
import { TripsService } from './trips/trips.service';
import { number } from 'joi';

@Injectable()
export class AppService {
  constructor(
    readonly seatsService: SeatsService,
    readonly tripsService: TripsService,
  ) {}
  createTripAndSeats(
    start_point: number,
    end_point: number,
    departureTime: Date,
    seats_number: number,
  ) {
    const trip = this.tripsService
      .create({
        originPoint: start_point,
        destinationPoint: end_point,
        departureTime: departureTime,
      })
      .then((trip) => {
        for (let i = 0; i < seats_number; i++) {
          this.seatsService
            .create({
              trip: trip.id,
              seatNumber: i,
              isBooked: false,
            })
            .then((r) => {
              console.log(r);
            });
        }
      });
    return trip;
  }
}
