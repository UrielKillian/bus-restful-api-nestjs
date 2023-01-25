import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seat } from '../../seats/entities/seat.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @OneToMany(() => Ticket, (ticket) => ticket.passenger)
  @JoinColumn()
  tickets: Ticket[];

  @OneToMany(() => Seat, (seat) => seat.passenger)
  seats: Seat[];
}
