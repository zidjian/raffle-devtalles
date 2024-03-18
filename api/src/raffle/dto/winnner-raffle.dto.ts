import { IsString, IsUUID } from 'class-validator';

export class WinnerRaffleDto {
  @IsString()
  @IsUUID()
  id: string;
}
