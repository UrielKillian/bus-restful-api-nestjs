import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Response, Request } from 'express';
import { SignInEmailDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtTokenService: JwtService,
  ) {}

  async validateUser(signInEmailDto: SignInEmailDto) {
    const user = await this.usersService.findByEmail(signInEmailDto.email);
    const isValidPassword = await bcrypt.compare(
      signInEmailDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid Password');
    }
    const { password, ...result } = user;
    return result;
  }

  async generateAccessToken(email: string, response: Response) {
    const user = await this.usersService.findByEmail(email);
    const token = this.jwtTokenService.sign({
      email: user.email,
      id: user.id,
    });
    response.cookie('accesstoken', token, {
      httpOnly: true,
      secure: true,
      /* domain: 'http://localhost:8080', */
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      sameSite: 'lax',
    });
    return token;
  }

  async profile(request: Request) {
    try {
      const cookie = request.cookies['accesstoken'];
      const data = await this.jwtTokenService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.usersService.findByEmail(data.email);
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  /*
    	Login with Email & Password
  	*/
  async loginWithEmail(signInDto: SignInEmailDto, ipAddress: string) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    /*
		if (user.verified === false) {
			throw new UnauthorizedException('Please verify your email');
		}
		*/
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.logger.log(
      `User with id:${user.id} and email:${user.email} has logged in successfully. IpAddress:${ipAddress}`,
    );
    return this.generateTokens(user);
  }
  /*
	 	Refresh Token
	*/
  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const decodedToken = (await this.jwtTokenService.decode(
      refreshTokenDto.refreshToken,
    )) as any;
    const user = await this.usersService.findOne(decodedToken.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    const secretKey = 'Heldsansasc' + user.password;
    const isValidRefreshToken = await this.jwtTokenService.verify(
      refreshTokenDto.refreshToken,
      {
        secret: secretKey,
      },
    );
    if (!isValidRefreshToken) {
      throw new UnauthorizedException('Invalid token');
    }
    // TODO: check if refresh token is being re generated too often
    return this.generateTokens(user);
  }
  /*
		Generate access & refresh tokens
	*/
  generateTokens(user: User) {
    const accessToken = this.jwtTokenService.sign({
      email: user.email,
      sub: user.id,
    });
    const refreshToken = this.jwtTokenService.sign(
      {
        email: user.email,
        sub: user.id,
      },
      {
        expiresIn: '30d',
        secret: 'Heldsansasc' + user.password,
      },
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      authenticatedUser: user,
    };
  }
  /*
  /*
		Get 2FA secret
	*/
  /*
    	Get authenticated user
  	*/
  async getUserDetails(userId: number) {
    this.logger.log(`Getting user details for id #${userId}`);
    const user = await this.usersService.findOne(userId);
    return { authenticatedUser: user };
  }
  /*
		Logout
	*/
  logout(res: Response) {
    res.clearCookie('accessToken');
    res.json({
      message: 'Logout successful',
    });
  }
}
