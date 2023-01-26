import { IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  readonly tripId: number;
  @IsNumber()
  readonly seatId: number;
  @IsNumber()
  readonly passengerId: number;
  @IsString()
  readonly arrivalDate: Date;
  @IsNumber()
  readonly userId: number;
}
