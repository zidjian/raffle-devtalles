import { Injectable } from '@nestjs/common';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { AccessToken } from './interfaces/access-token.interface';

@Injectable()
export class AuthService {
  constructor(private readonly http: AxiosAdapter) {}

  async accessToken(discordCode: string) {
    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: discordCode,
      redirect_uri: 'http://localhost:3001/api/auth/discord/redirect',
      // redirect_uri: 'https://www.google.com/',
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const url = 'https://discord.com/api/v10/oauth2/token';

    const response = await this.http.post<AccessToken>(url, data, { headers });

    const userInfo = await this.http.get<any>(
      'https://discord.com/api/v10/users/@me',
      { headers: { Authorization: `Bearer ${response.access_token}` } },
    );

    const userGuilds = await this.http.get<any>(
      'https://discord.com/api/v10/users/@me/guilds/1130900724499365958/member',
      { headers: { Authorization: `Bearer ${response.access_token}` } },
    );

    return { userInfo, userGuilds };
  }
}
