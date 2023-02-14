import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  getAllUsers() {
    // return this.db.users.getAll();
  }

  getUserById(id: string) {
    // return this.db.users.getById(id);
  }

  createUser(createUserDto: CreateUserDto) {
    // return this.db.users.create(createUserDto);
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    // try {
    //   return this.db.users.update(id, updatePasswordDto);
    // } catch (err) {
    //   throw err instanceof NoRequiredEntity
    //     ? new NotFoundException('No users with such id')
    //     : err instanceof InvalidPassword
    //     ? new ForbiddenException('Old password is invalid')
    //     : err;
    // }
  }

  removeUser(id: string) {
    // try {
    //   this.db.users.remove(id);
    // } catch (err) {
    //   throw err instanceof NoRequiredEntity
    //     ? new NotFoundException('No users with such id')
    //     : err;
    // }
  }
}
