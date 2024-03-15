import { Module } from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { RaffleController } from './raffle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raffle } from './entities/raffle.entity';

import { PrizeModule } from 'src/prize/prize.module';

@Module({
  controllers: [RaffleController],
  providers: [RaffleService],

  imports: [TypeOrmModule.forFeature([Raffle]), PrizeModule],

  exports: [TypeOrmModule],
})
export class RaffleModule {}
