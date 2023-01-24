import { IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNumber()
  readonly originPoint: number;
  @IsNumber()
  readonly destinationPoint: number;
  @IsString()
  readonly departureTime: Date;
}
