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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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

    const token = sign(
      { userId: user.id, login: user.login },
      <string>process.env.JWT_SECRET_KEY,
    );

    return { token };
  }
}
