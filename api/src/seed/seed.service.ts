import { Injectable } from '@nestjs/common';

import { RaffleService } from 'src/raffle/raffle.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Raffle } from 'src/raffle/entities/raffle.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly raffleService: RaffleService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Raffle)
    private readonly raffleRepository: Repository<Raffle>,
  ) {}

  async runSeed() {
    await this.delateTables();

    const { admin, users } = await this.insertUsers();
    await this.insertRaffles(admin);
    await this.insertParticipants(users);

    await this.setAWinner(users[0]);
    return 'seed executed!';
  }
  async deleteAllRaffleParticipants() {
    try {
      // Obtén todos los usuarios con las rifas en las que participan cargadas
      const allUsers = await this.userRepository.find({
        relations: ['raffles'],
      });

      // Elimina todas las relaciones de rifas de participantes de cada usuario
      await Promise.all(
        allUsers.map(async (user) => {
          user.raffles = []; // Vacía la lista de rifas en las que participa
          await this.userRepository.save(user); // Guarda el usuario actualizado en la base de datos
        }),
      );

      return 'Relaciones de participantes de las rifas eliminadas exitosamente para todos los usuarios.';
    } catch (error) {
      console.error(
        'Error al eliminar las relaciones de participantes de las rifas para los usuarios:',
        error,
      );
      throw new Error(
        'No se pudieron eliminar las relaciones de participantes de las rifas para los usuarios.',
      );
    }
  }
  private async delateTables() {
    await this.raffleService.deleteAllRaffleParticipants();
    await this.raffleService.deleteAllProducts();

    await this.deleteAllRaffleParticipants();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const [admin, testUser, ...dbUsers] =
      await this.userRepository.save(seedUsers);

    return { admin, testUser, users: dbUsers };
  }

  private async insertRaffles(user: User) {
    const seedRaffles = initialData.raffles;

    const insertPromises = [];

    seedRaffles.forEach((raffle) => {
      insertPromises.push(this.raffleService.create(raffle, user));
    });

    await Promise.all(insertPromises);
    return true;
  }

  private async insertParticipants(users: User[]) {
    const raffles = await this.raffleService.findAll();

    const insertPromises = [];

    raffles.forEach((raffle) => {
      users.forEach((user) => {
        insertPromises.push(
          this.raffleService.participateRaffle(user.id, raffle.id),
        );
      });
    });

    await Promise.all(insertPromises);
    return true;
  }

  private async setAWinner(user: User) {
    const title = 'Sorteo de la Comunidad de Desarrolladores Frontend';
    const raffle = await this.raffleRepository.findOne({ where: { title } });

    await this.raffleService.setWinner(raffle.id, user.id);
  }
}
