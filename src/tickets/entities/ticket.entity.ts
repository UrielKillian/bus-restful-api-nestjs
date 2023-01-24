import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { Passenger } from '../../passengers/entities/passenger.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { JoinColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Department, (department) => department.ticket_originPoint)
  originPoint: Department;

  @ManyToOne(
    () => Department,
    (department) => department.ticket_destinationPoint,
  )
  destinationPoint: Department;

  @Column()
  departureDate: Date;

  @Column()
  arrivalDate: Date;

  @ManyToOne(() => Passenger, (passenger) => passenger.tickets)
  passenger: Passenger;

  @OneToOne(() => Seat)
  @JoinColumn()
  seat: Seat;
}
