import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrizeService } from './prize.service';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { Raffle } from 'src/raffle/entities/raffle.entity';

@Controller('prize')
export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  @Post()
  create(@Body() createPrizeDto: CreatePrizeDto, raffle: Raffle) {
    return this.prizeService.create(createPrizeDto, raffle);
  }

  @Get()
  findAll() {
    return this.prizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prizeService.findOne(id);
  }

  /*   @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrizeDto: UpdatePrizeDto) {
    return this.prizeService.update(updatePrizeDto, );
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prizeService.remove(+id);
  }
}
