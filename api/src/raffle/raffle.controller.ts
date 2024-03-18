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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('raffle')
export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createRaffleDto: CreateRaffleDto, @GetUser() user: User) {
    console.log('user Controler', user);
    return this.raffleService.create(createRaffleDto, user);
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
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRaffleDto: UpdateRaffleDto,
    @GetUser() user: User,
  ) {
    return this.raffleService.update(id, updateRaffleDto, user);
  }

  @Post('/participate/:raffleId')
  @Auth()
  participateRaffle(
    @GetUser('id') userId: string,
    @Param('raffleId', ParseUUIDPipe) raffleId: string,
  ) {
    return this.raffleService.participateRaffle(userId, raffleId);
  }

  @Post('/')
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.raffleService.remove(id);
  }

  @Get('/:raffleId/participants')
  getRaffleParticipants(@Param('raffleId', ParseUUIDPipe) raffleId: string) {
    return this.raffleService.getRaffleParticipants(raffleId);
  }
}
