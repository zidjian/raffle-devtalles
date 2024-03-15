import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prize } from './entities/prize.entity';

@Module({
  controllers: [PrizeController],
  providers: [PrizeService],
  imports: [TypeOrmModule.forFeature([Prize])],
  exports: [TypeOrmModule],
})
export class PrizeModule {}
