import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('No users with such id');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const cryptSalt = +(<string>process.env.CRYPT_SALT) ?? 10;
    const hashedPassword = await hash(createUserDto.password, cryptSalt);
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException('No users with such id');
    }
    if (userToUpdate.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Password is invalid');
    }
    userToUpdate.password = updatePasswordDto.newPassword;
    await this.userRepository.save(userToUpdate);
    return userToUpdate;
  }

  async removeUser(id: string) {
    const userToRemove = await this.userRepository.findOneBy({ id });
    if (!userToRemove) {
      throw new NotFoundException('No users with such id');
    }
    await this.userRepository.remove(userToRemove);
  }
}
