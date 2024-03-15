import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { Repository } from 'typeorm';
import { Raffle } from './entities/raffle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PrizeService } from '../prize/prize.service';

@Injectable()
export class RaffleService {
  constructor(
    @InjectRepository(Raffle)
    private readonly raffleRepository: Repository<Raffle>,

    private readonly prizeService: PrizeService,
  ) {}

  async create(createRaffleDto: CreateRaffleDto) {
    try {
      const { prizes = [], ...raffleDetails } = createRaffleDto;

      const newRaffle = await this.raffleRepository.create({
        ...raffleDetails,
      });

      const savedRaffle = await this.raffleRepository.save(newRaffle);

      const promisePrizes = prizes.map(
        async (prize) => await this.prizeService.create(prize, savedRaffle),
      );

      const resolvePrizes = await Promise.all(promisePrizes);

      savedRaffle.prizes = resolvePrizes;

      return {
        ...savedRaffle,
        prizes: resolvePrizes.map(({ raffle, ...prize }) => prize),
      };
    } catch (error) {
      console.log('Raffle Service', error);
    }
  }

  async findAll() {
    try {
      const raffles = await this.raffleRepository.find({
        relations: ['prizes'],
      });

      return raffles.map((raffle) => ({
        ...raffle,
        prizes: raffle.prizes.map((prize) => ({ ...prize })),
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    const raffle = await this.raffleRepository
      .createQueryBuilder('raffle')
      .leftJoinAndSelect('raffle.prizes', 'prize')
      .where('raffle.id = :id', { id })
      .getOne();

    if (!raffle) {
      throw new NotFoundException(`No se encontró la rifa con el id ${id}`);
    }

    return raffle;
  }

  async update(id: string, updateRaffleDto: UpdateRaffleDto) {
    const { prizes, ...updatedRaffleData } = updateRaffleDto;

    const raffle = await this.findOne(id);

    await this.raffleRepository.save({
      ...raffle,
      ...updatedRaffleData,
    });

    const processedPrizes = [];

    for (const prize of prizes) {
      if (prize.id) {
        console.log('si tiene id ', prize.id);

        await this.prizeService.update(prize, raffle);
        processedPrizes.push(prize);
      } else {
        const newPrize = await this.prizeService.create(prize, raffle);
        processedPrizes.push(newPrize);
      }
    }

    const prizeIdsToRemove = raffle.prizes
      .filter((prize) => !processedPrizes.find((p) => p.id === prize.id))
      .map((prize) => prize.id);

    if (prizeIdsToRemove.length > 0) {
      await this.prizeService.removeMany(prizeIdsToRemove);
    }

    return await this.findOne(id);
  }

  async remove(id: string) {
    const raffle = await this.findOne(id);

    await this.raffleRepository.remove(raffle);
  }
}
