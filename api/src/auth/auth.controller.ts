import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/discord/redirect')
  getUserDiscord(@Query('code') discordCode: string) {
    return this.authService.accessToken(discordCode);
  }
}
