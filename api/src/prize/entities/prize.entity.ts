import { Raffle } from 'src/raffle/entities/raffle.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('prize')
export class Prize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text', {
    nullable: true,
  })
  photo?: string;

  @ManyToOne(() => Raffle, (raffle) => raffle.prizes, { onDelete: 'CASCADE' })
  @JoinColumn()
  raffle: Raffle;
}
