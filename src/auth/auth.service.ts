import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

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
  }
}
