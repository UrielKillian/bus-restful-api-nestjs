import { IsString } from "class-validator";

export class CreatePassengerDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly lastName: string;
}
