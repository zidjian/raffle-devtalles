import { PartialType } from '@nestjs/mapped-types';
import { CreateRaffleDto } from './create-raffle.dto';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdatePrizeDto } from 'src/prize/dto/update-prize.dto';
import { Type } from 'class-transformer';
import { RaffleStatus } from '../entities/raffle.entity';

export class UpdateRaffleDto extends PartialType(CreateRaffleDto) {
  @IsString()
  @IsOptional()
  status?: RaffleStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePrizeDto)
  prizes: UpdatePrizeDto[];
}
