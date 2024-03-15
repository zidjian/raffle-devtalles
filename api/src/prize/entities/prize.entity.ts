import { Raffle } from 'src/raffle/entities/raffle.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('prize')
export class Prize {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  photo?: string;

  @OneToOne(() => Raffle, (raffle) => raffle.prize)
  @JoinColumn()
  raffle: Raffle;
}
