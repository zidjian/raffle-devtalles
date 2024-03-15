import { User } from 'src/auth/entities/user.entity';
import { Prize } from 'src/prize/entities/prize.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

export enum RaffleStatus {
  ACTIVO = 'activo',
  FINALIZADO = 'finalizado',
}

@Entity('raffle')
export class Raffle {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description?: string;

  @Column('text')
  photo: string;

  @Column('enum', {
    enum: RaffleStatus,
    default: RaffleStatus.ACTIVO,
  })
  status: RaffleStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column('date')
  deadLine: Date;

  @ManyToMany(() => User, (user) => user.raffles)
  @JoinTable()
  users: User[];

  @OneToMany(() => Prize, (prize) => prize.raffle)
  prize: Prize[];
}
