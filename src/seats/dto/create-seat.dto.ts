import { IsBoolean, IsNumber } from 'class-validator';

export class CreateSeatDto {
  @IsNumber()
  readonly seatNumber: number;
  @IsBoolean()
  readonly isBooked: boolean;
}
