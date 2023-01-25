import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Trip } from '../../trips/entities/trip.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  // Relations
  @OneToMany((type) => Trip, (trip) => trip.originPoint)
  trips_origin: Trip[];
  @OneToMany((type) => Trip, (trip) => trip.destinationPoint)
  trips_destination: Trip[];
}
