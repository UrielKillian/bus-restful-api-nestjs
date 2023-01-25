import { Injectable } from '@nestjs/common';
import { SeatsService } from './seats/seats.service';
import { TripsService } from './trips/trips.service';
import { number } from 'joi';
import { TicketsService } from './tickets/tickets.service';
import { PassengersService } from './passengers/passengers.service';

@Injectable()
export class AppService {
  constructor(
    readonly seatsService: SeatsService,
    readonly tripsService: TripsService,
    readonly ticketsService: TicketsService,
    readonly passengerService: PassengersService,
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

  async createTicket(
    seatId: number,
    tripId: number,
    passenger_name: string,
    passenger_lastname: string,
    arrived_time: Date,
  ) {
    const passenger = await this.passengerService
      .create({
        name: passenger_name,
        lastName: passenger_lastname,
      })
      .then(async (p) => {
        await this.seatsService.update(seatId, p.id, { isBooked: true });
        await this.ticketsService.create({
          seatId: seatId,
          tripId: tripId,
          passengerId: p.id,
          arrivalDate: arrived_time,
        });
      });
    return passenger;
  }
}
