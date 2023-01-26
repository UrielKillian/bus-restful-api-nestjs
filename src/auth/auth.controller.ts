import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Ip,
  Logger,
} from '@nestjs/common';
import { Public } from 'src/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { SignInEmailDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  private logger = new Logger();
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() signInEmailDto: SignInEmailDto, @Ip() userIp) {
    const { email, password } = signInEmailDto;
    const user = await this.authService.loginWithEmail(signInEmailDto, userIp);
    return user;
  }

  @Get('/profile')
  async profile(@Request() req) {
    console.log(req.user);
    return await this.authService.getUserDetails(req.user.userId);
  }

  @Get('/refresh-token')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req);
  }
}
