import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';

@Controller('raffle')
export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  @Post()
  create(@Body() createRaffleDto: CreateRaffleDto) {
    return this.raffleService.create(createRaffleDto);
  }

  @Get()
  findAll() {
    return this.raffleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.raffleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRaffleDto: UpdateRaffleDto,
  ) {
    return this.raffleService.update(id, updateRaffleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.raffleService.remove(id);
  }
}
