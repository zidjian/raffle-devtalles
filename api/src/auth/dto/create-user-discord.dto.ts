import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDiscordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(0)
  discordId: string;

  @IsString()
  @MinLength(0)
  username: string;

  @IsString()
  @MinLength(0)
  access_token: string;

  @IsString()
  @MinLength(0)
  refresh_token: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
