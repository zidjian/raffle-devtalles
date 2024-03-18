import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { Repository } from 'typeorm';
import { Raffle } from './entities/raffle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PrizeService } from '../prize/prize.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RaffleService {
  constructor(
    @InjectRepository(Raffle)
    private readonly raffleRepository: Repository<Raffle>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly prizeService: PrizeService,
  ) {}

  async create(createRaffleDto: CreateRaffleDto, user: User) {
    try {
      const { prizes = [], ...raffleDetails } = createRaffleDto;

      const newRaffle = await this.raffleRepository.create({
        ...raffleDetails,
        creator: user,
      });

      console.log('user', user);

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

  async participateRaffle(userId: string, raffleId: string) {
    // Verificar si el usuario ya está unido al servidor de Discord
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user || !user.discordId || user.isGuildMember === false) {
      throw new BadRequestException(
        'El usuario no está unido al servidor de Discord.',
      );
    }

    // Verificar si el usuario ya está participando en la rifa
    const raffle = await this.raffleRepository
      .createQueryBuilder('raffle')
      .leftJoinAndSelect('raffle.participants', 'participants')
      .where('raffle.id = :raffleId', { raffleId })
      .getOne();

    if (!raffle) {
      throw new NotFoundException(
        `No se encontro la rifa con el id ${raffleId}`,
      );
    }

    if (raffle.participants.some((participant) => participant.id === userId)) {
      throw new BadRequestException(
        'El usuario ya está participando en esta rifa.',
      );
    }

    // Verificar si el sorteo ha terminado
    if (new Date() > raffle.deadLine) {
      throw new Error('El sorteo ha terminado.');
    }

    // Agregar al usuario a la rifa
    raffle.participants.push(user);
    await this.raffleRepository.save(raffle);

    return { ok: true, message: 'Participación exitosa' };
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

  async getRaffleParticipants(raffleId: string) {
    const raffle = await this.raffleRepository
      .createQueryBuilder('raffle')
      .leftJoinAndSelect('raffle.participants', 'participants')
      .where('raffle.id = :raffleId', { raffleId })
      .getMany();

    const participants = raffle.map((raffle) => raffle.participants).flat();

    return participants;
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

  async update(id: string, updateRaffleDto: UpdateRaffleDto, user: User) {
    const { prizes, ...updatedRaffleData } = updateRaffleDto;

    const raffle = await this.findOne(id);

    await this.raffleRepository.save({
      ...raffle,
      ...updatedRaffleData,
      creator: user,
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

  async deleteAllProducts() {
    const query = this.raffleRepository.createQueryBuilder('raffle');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {}
  }

  async deleteAllRaffleParticipants() {
    try {
      // Obtener todas las rifas
      const allRaffles = await this.raffleRepository.find({
        relations: ['participants'],
      });

      // Iterar sobre cada rifa y limpiar la lista de participantes
      for (const raffle of allRaffles) {
        raffle.participants = []; // Vaciar la lista de participantes
        await this.raffleRepository.save(raffle); // Guardar la rifa actualizada
      }

      return 'Relaciones de rifa y participantes eliminadas exitosamente.';
    } catch (error) {
      // Manejar errores
      console.error(
        'Error al eliminar las relaciones de rifa y participantes:',
        error,
      );
      throw new Error(
        'No se pudieron eliminar las relaciones de rifa y participantes.',
      );
    }
  }
}
