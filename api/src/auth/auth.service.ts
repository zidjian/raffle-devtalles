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
    try {
      const { access_token, refresh_token } =
        await this.getAccessToken(discordCode);
      const userInfo = await this.getUserInfo(access_token);
      const isGuildMember = await this.checkGuildMembership(access_token);
      const user = await this.findOrCreateUser(
        userInfo,
        access_token,
        refresh_token,
        isGuildMember,
      );

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
    } catch (error) {
      throw new BadRequestException('Error al iniciar sesión con Discord');
    }
  }

  private async getAccessToken(discordCode: string) {
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
    const { access_token, refresh_token } = await this.http.post<AccessToken>(
      url,
      data,
      {
        headers,
      },
    );
    return { access_token, refresh_token };
  }

  private async getUserInfo(accessToken: string) {
    const userInfo = await this.http.get<IUserDiscord>(
      'https://discord.com/api/v10/users/@me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return userInfo;
  }

  private async checkGuildMembership(accessToken: string) {
    const checkIfIsMemberOfGuild = await this.http.get<any>(
      'https://discord.com/api/v10/users/@me/guilds/1130900724499365958/member',
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return !!checkIfIsMemberOfGuild;
  }

  private async getNewTokenDiscord(refreshToken) {
    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const url = 'https://discord.com/api/v10/oauth2/token';

    const { access_token, refresh_token } = await this.http.post<AccessToken>(
      url,
      data,
      {
        headers,
      },
    );
    return { access_token, refresh_token };
  }

  async checkDiscordGuild(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        refresh_token: true,
        id: true,
        discordId: true,
        isGuildMember: true,
      },
    });

    if (!user.discordId) {
      throw new BadRequestException(
        'El usuario no tiene un Discord asociado, asocia una cuenta para continuar',
      );
    }
    const { access_token, refresh_token } = await this.getNewTokenDiscord(
      user.refresh_token,
    );

    // Obtener información del usuario desde Discord utilizando el token de acceso
    const userInfo = await this.getUserInfo(access_token);

    // Verificar si el usuario es miembro de la guild en Discord utilizando el token de acceso
    const isGuildMember = await this.checkGuildMembership(access_token);

    if (!isGuildMember) {
      throw new BadRequestException(`No eres parte del servidor de DevTalles`);
    }
    // Actualizar la información del usuario en la base de datos, creándolo si no existe
    const updatedUser = await this.findOrCreateUser(
      userInfo,
      access_token,
      refresh_token,
      isGuildMember,
    );

    // Generar el token JWT con la información actualizada del usuario
    const token = this.getJwtToken({
      id: updatedUser.id,
      discordId: updatedUser.discordId,
      isGuildMember: updatedUser.isGuildMember,
    });

    // Devolver el token JWT
    return token;
  }

  private async findOrCreateUser(
    userInfo: IUserDiscord,
    accessToken: string,
    refreshToken: string,
    isGuildMember: boolean,
  ) {
    const { id, username, email, avatar } = userInfo;
    let user = await this.userRepository.findOne({ where: { discordId: id } });

    if (!user) {
      user = await this.userRepository.create({
        discordId: id,
        username,
        email,
        avatar,
        access_token: accessToken,
        refresh_token: refreshToken,
        isGuildMember,
      });
    } else {
      user.username = username;
      user.avatar = avatar;
      user.access_token = accessToken;
      user.refresh_token = refreshToken;

      user.isGuildMember = isGuildMember;
    }

    await this.userRepository.save(user);
    return user;
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
      select: {
        email: true,
        password: true,
        id: true,
        discordId: true,
        isGuildMember: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;

    console.log(user);

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
