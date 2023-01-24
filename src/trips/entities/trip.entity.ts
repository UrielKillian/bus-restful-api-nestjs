import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Department } from '../../departments/entities/department.entity';
import { Seat } from '../../seats/entities/seat.entity';

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
  })
  seats: Seat[];

  @CreateDateColumn()
  createdAt: Date;
}
