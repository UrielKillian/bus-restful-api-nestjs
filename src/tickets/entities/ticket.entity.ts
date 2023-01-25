import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { Passenger } from '../../passengers/entities/passenger.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { JoinColumn } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trip, (trip) => trip.tickets, {
    cascade: true,
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  trip: Trip;

  @Column()
  arrivalDate: Date;

  @ManyToOne(() => Passenger, (passenger) => passenger.tickets,{
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  passenger: Passenger;

  @OneToOne(() => Seat, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  seat: Seat;
}
