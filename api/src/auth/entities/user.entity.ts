import { Raffle } from 'src/raffle/entities/raffle.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  discordId: string;

  @Column('text')
  username: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { select: false })
  access_token: string;

  @Column('text', { select: false })
  refresh_token: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @ManyToMany(() => Raffle, (raffle) => raffle.users)
  @JoinTable()
  raffles: Raffle[];
}
