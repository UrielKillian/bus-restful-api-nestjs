import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Department, { eager: true })
  @JoinColumn()
  originPoint: Department;

  @ManyToOne((type) => Department, { eager: true })
  @JoinColumn()
  destinationPoint: Department;

  @Column()
  departureTime: Date;

  @OneToMany((type) => Seat, (seat) => seat.trip, {
    cascade: true,
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  seats: Seat[];

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => Ticket, (ticket) => ticket.trip, {
    onDelete: 'CASCADE',
  })
  tickets: Ticket[];
}
