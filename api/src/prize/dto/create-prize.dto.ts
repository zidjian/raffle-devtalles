import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePrizeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
