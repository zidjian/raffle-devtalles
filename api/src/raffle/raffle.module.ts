import { Module } from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { RaffleController } from './raffle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raffle } from './entities/raffle.entity';

@Module({
  controllers: [RaffleController],
  providers: [RaffleService],

  imports: [TypeOrmModule.forFeature([Raffle])],

  exports: [TypeOrmModule],
})
export class RaffleModule {}
