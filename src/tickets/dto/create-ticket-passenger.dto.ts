import { IsNumber, IsString } from 'class-validator';

export class CreateTicketAndPassengerDto {
  @IsNumber()
  readonly tripId: number;
  @IsNumber()
  readonly seatId: number;
  @IsString()
  readonly passengerName: string;
  @IsString()
  readonly passengerLastName: string;
  @IsString()
  readonly arrivedTime: Date;
}
