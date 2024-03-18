[
  {
    userInfo: {
      id: '271118052546838529',
      username: 'kkmilo',
      avatar: 'e2c827c1ff75dbbecb7620e02e00f8d8',
      discriminator: '0',
      public_flags: 0,
      premium_type: 0,
      flags: 0,
      banner: null,
      accent_color: null,
      global_name: 'Kkmilo',
      avatar_decoration_data: null,
      banner_color: null,
      mfa_enabled: false,
      locale: 'es-ES',
      email: 'ca.milo44@hotmail.com',
      verified: true,
    },
  },
];

export interface IUserDiscord {
  id: string;
  username: string;
  avatar: string;
  email: string;
  discriminator?: string;
  public_flags?: number;
  premium_type?: number;
  flags?: number;
  banner?: string;
  accent_color?: string;
  global_name?: string;
  avatar_decoration_data?: string;
  banner_color?: string;
  mfa_enabled?: boolean;
  locale?: string;
  verified?: boolean;
}
