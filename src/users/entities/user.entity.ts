import { PrimaryGeneratedColumn, Column, BeforeInsert, Entity, OneToMany } from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Ticket } from "../../tickets/entities/ticket.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Relations
  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
