import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  readonly dni: number;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
}
