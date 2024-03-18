import { User } from 'src/auth/entities/user.entity';
import { Prize } from 'src/prize/entities/prize.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum RaffleStatus {
  ACTIVO = 'activo',
  FINALIZADO = 'finalizado',
}

@Entity('raffle')
export class Raffle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description?: string;

  @Column('text', {
    nullable: true,
  })
  photo?: string;

  @Column('enum', {
    enum: RaffleStatus,
    default: RaffleStatus.ACTIVO,
  })
  status: RaffleStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column('date')
  deadLine: Date;

  @ManyToMany(() => User, (user) => user.raffles, { eager: true })
  participants: User[];

  @ManyToOne(() => User, (user) => user.createdRaffles, { eager: true })
  creator: User;

  /*   @OneToMany(() => Prize, (prize) => prize.raffle)
  prizes: Prize[]; */

  @ManyToOne(() => User, { nullable: true })
  winner: User;
}
