import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn({
    transformer: {
      from(date: Date): number {
        return date.getTime();
      },
      to(date: Date): Date {
        return date;
      },
    },
  })
  createdAt: number; // timestamp of creation

  @UpdateDateColumn({
    transformer: {
      from(date: Date): number {
        return date.getTime();
      },
      to(date: Date): Date {
        return date;
      },
    },
  })
  updatedAt: number; // timestamp of last update
}
