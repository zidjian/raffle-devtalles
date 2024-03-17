import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { AccessToken } from './interfaces/access-token.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { IUserDiscord } from './interfaces/user-discord.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly http: AxiosAdapter,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithDiscord(discordCode: string) {
    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: discordCode,
      redirect_uri: 'http://localhost:3001/api/auth/discord/redirect',
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const url = 'https://discord.com/api/v10/oauth2/token';

    const response = await this.http.post<AccessToken>(url, data, { headers });

    const userInfo: IUserDiscord = await this.http.get<any>(
      'https://discord.com/api/v10/users/@me',
      { headers: { Authorization: `Bearer ${response.access_token}` } },
    );

    const checkIfIsMemberOfGuild = await this.http.get<any>(
      'https://discord.com/api/v10/users/@me/guilds/1130900724499365958/member',
      { headers: { Authorization: `Bearer ${response.access_token}` } },
    );

    const isGuildMember = checkIfIsMemberOfGuild ? true : false;

    const { id, username, email } = userInfo;

    let user = await this.userRepository.findOne({
      where: { discordId: id },
    });

    if (!user) {
      const newUser = await this.userRepository.create({
        discordId: id,
        username,
        email,
        isGuildMember,
      });
      user = await this.userRepository.save(newUser);
    } else {
      console.log('Estoy actualizando');

      await this.userRepository.save({ ...user, username, isGuildMember });
    }

    const token = this.getJwtToken({
      id: user.id,
      discordId: user.discordId,
      isGuildMember: user.isGuildMember,
    });
    return `
      <script>
        window.location.href = 'http://localhost:3000/success?token=${token}';
      </script>
    `;
    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        discordId: user.discordId,
        isGuildMember: user.isGuildMember,
      }),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({
          id: user.id,
          discordId: user.discordId,
          isGuildMember: user.isGuildMember,
        }),
      };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }
  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        discordId: user.discordId,
        isGuildMember: user.isGuildMember,
      }),
    };
  }
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        discordId: user.discordId,
        isGuildMember: user.isGuildMember,
      }),
    };
  }

  private handleDbErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
