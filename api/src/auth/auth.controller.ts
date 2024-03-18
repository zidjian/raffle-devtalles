import {
  Body,
  Controller,
  Get,
  Post,
  Query,

  /*   Req,
  SetMetadata,
  UseGuards, */
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/discord/redirect')
  loginWithDiscord(@Query('code') discordCode: string) {
    return this.authService.loginWithDiscord(discordCode);
  }

  @Get('/user/me')
  @Auth()
  getCurrentUser(@GetUser() user: User) {
    return user;
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get('/check-discordGuild')
  @Auth()
  checkDiscordGuild(@GetUser('id') userId: string) {
    console.log('userId', userId);

    return this.authService.checkDiscordGuild(userId);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
