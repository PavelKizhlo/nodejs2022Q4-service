import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  private getTokens(user: User) {
    const payload = { userId: user.id, login: user.login };

    const token = sign(payload, <string>process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = sign(
      payload,
      <string>process.env.JWT_SECRET_REFRESH_KEY,
      {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );

    return { token, refreshToken };
  }

  async signup(createUserDto: CreateUserDto) {
    const loginExists = !!(await this.userRepository.findOneBy({
      login: createUserDto.login,
    }));
    console.log(loginExists);
    if (loginExists) {
      throw new ConflictException('Login already exists');
    }
    await this.userService.createUser(createUserDto);
    return { message: 'Successful signup' };
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      login: createUserDto.login,
    });

    if (!user) {
      throw new ForbiddenException('No users with such login');
    }

    const isRightPassword = await compare(
      createUserDto.password,
      user.password,
    );

    if (!isRightPassword) {
      throw new ForbiddenException('Invalid password');
    }

    return this.getTokens(user);
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const userData: { userId: string; login: string } = this.jwtService.verify(
      refreshTokenDto.refreshToken,
      {
        secret: <string>process.env.JWT_SECRET_REFRESH_KEY,
      },
    );

    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    if (!user) {
      throw new ForbiddenException('refresh token is invalid or expired');
    }

    return this.getTokens(user);
  }
}
