import { Injectable } from '@nestjs/common';

import { RaffleService } from 'src/raffle/raffle.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly raffleService: RaffleService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.delateTables();

    const adminUser = await this.insertUsers();
    await this.insertRaffles(adminUser);

    return 'seed executed!';
  }

  private async delateTables() {
    await this.raffleService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();

    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
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
}
