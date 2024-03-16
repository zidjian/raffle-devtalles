import { Raffle } from './../raffle/entities/raffle.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prize } from './entities/prize.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrizeService {
  constructor(
    @InjectRepository(Prize)
    private readonly prizeRepository: Repository<Prize>,
  ) {}
  async create(createPrizeDto: CreatePrizeDto, raffle: Raffle) {
    try {
      const prize = await this.prizeRepository.create({
        ...createPrizeDto,
        raffle,
      });

      return await this.prizeRepository.save(prize);
    } catch (error) {
      console.log('Prize Service', error);
    }
  }

  findAll() {
    return `This action returns all prize`;
  }

  async findOne(id: string) {
    const prize = await this.prizeRepository.findOneBy({ id });

    if (!prize) {
      throw new NotFoundException(`Prize with the id ${id} not found`);
    }

    return prize;
  }

  async update(updatePrizeDto: UpdatePrizeDto, raffle: Raffle) {
    const { id, ...prizeData } = updatePrizeDto;

    const prize = await this.findOne(id);

    return this.prizeRepository.save({ ...prize, ...prizeData, raffle });
  }

  async removeMany(prizeIdsToRemove: string[]) {
    await this.prizeRepository.delete(prizeIdsToRemove);
  }

  remove(id: number) {
    return `This action removes a #${id} prize`;
  }
}
