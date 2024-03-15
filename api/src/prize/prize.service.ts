import { Injectable } from '@nestjs/common';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';

@Injectable()
export class PrizeService {
  create(createPrizeDto: CreatePrizeDto) {
    return 'This action adds a new prize';
  }

  findAll() {
    return `This action returns all prize`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prize`;
  }

  update(id: number, updatePrizeDto: UpdatePrizeDto) {
    return `This action updates a #${id} prize`;
  }

  remove(id: number) {
    return `This action removes a #${id} prize`;
  }
}
