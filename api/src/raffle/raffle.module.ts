import { Module } from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { RaffleController } from './raffle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raffle } from './entities/raffle.entity';

import { PrizeModule } from 'src/prize/prize.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RaffleController],
  providers: [RaffleService],

  imports: [TypeOrmModule.forFeature([Raffle]), PrizeModule, AuthModule],

  exports: [TypeOrmModule, RaffleService],
})
export class RaffleModule {}
