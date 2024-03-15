import { PartialType } from '@nestjs/mapped-types';
import { CreatePrizeDto } from './create-prize.dto';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePrizeDto extends PartialType(CreatePrizeDto) {
  @IsString()
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  photo?: string;
}
