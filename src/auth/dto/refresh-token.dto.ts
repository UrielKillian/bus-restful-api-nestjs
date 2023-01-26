import { IsEmail } from 'class-validator';

export class RefreshTokenDto {
  @IsEmail()
  refreshToken: string;
}
