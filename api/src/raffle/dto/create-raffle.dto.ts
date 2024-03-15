import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePrizeDto } from 'src/prize/dto/create-prize.dto';

export class CreateRaffleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  deadLine: string;

  @IsOptional()
  photo?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrizeDto)
  prizes: CreatePrizeDto[];
}
