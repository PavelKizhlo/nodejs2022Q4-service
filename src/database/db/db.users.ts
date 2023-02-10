import { v4 as uuidv4 } from 'uuid';
import { DbEntity } from './db.entity';
import { User } from '../../user/entities/user.entity';
import { UpdatePasswordDto } from '../../user/dto/update-password.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { NoRequiredEntity } from '../errors/noRequireEntity.error';
import { InvalidPassword } from '../errors/invalidPassword';
import { users } from '../data.placeholder';

export class DbUsers extends DbEntity<User, UpdatePasswordDto, CreateUserDto> {
  protected entities = users;

  create(createDto: CreateUserDto): User {
    const date = new Date().getTime();
    const created = new User({
      ...createDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
      id: uuidv4(),
    });
    this.entities.push(created);
    return created;
  }

  update(id: string, changeDto: UpdatePasswordDto): User {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) throw new NoRequiredEntity('updating');
    const userToUpdate = this.entities[idx];
    if (userToUpdate.password !== changeDto.oldPassword) {
      throw new InvalidPassword();
    }
    const updated = new User({
      ...userToUpdate,
      password: changeDto.newPassword,
      version: ++userToUpdate.version,
      updatedAt: new Date().getTime(),
    });
    this.entities.splice(idx, 1, updated);
    return updated;
  }
}
