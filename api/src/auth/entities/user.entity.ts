import { Raffle } from 'src/raffle/entities/raffle.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: true,
  })
  discordId: string;

  @Column('text', {
    nullable: true,
  })
  username: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', { select: false, nullable: true })
  password: string;

  @Column('text', { select: false, nullable: true })
  access_token: string;

  @Column('text', { select: false, nullable: true })
  refresh_token: string;

  @Column('text', { nullable: true })
  avatar: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column('bool', { default: false })
  isGuildMember: boolean;

  @Column('bool', { default: true })
  isActive: boolean;

  @ManyToMany(() => Raffle, (raffle) => raffle.participants)
  @JoinTable()
  raffles: Raffle[];

  @OneToMany(() => Raffle, (raffle) => raffle.creator)
  createdRaffles: Raffle[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().toString();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
