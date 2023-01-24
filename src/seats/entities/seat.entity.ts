import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';
import { Passenger } from '../../passengers/entities/passenger.entity';
import { JoinColumn } from 'typeorm';
import Joi from "joi";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  seatNumber: number;

  @Column()
  isBooked: boolean;

  @ManyToOne((type) => Trip, (trip) => trip.seats, {
    onDelete: 'CASCADE',
  })
  trip: Trip;

  @ManyToOne((type) => Passenger, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  passenger: Passenger;
}
