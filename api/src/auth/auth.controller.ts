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
/* import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-header.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator'; */

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

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  /*     @Get('private')
  @UseGuards(AuthGuard()) 
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @Req() request: Express.Request,

    @RawHeaders() rawHeaders: string[],
  ) {
    return {
      ok: true,
      message: 'Hola mundo Private',
      user,
      userEmail,
      rawHeaders,
    };
  } 

  @Get('private2')
  @RoleProtected()
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  } */
}
