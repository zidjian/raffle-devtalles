import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import type { NextAuthConfig } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { json } from 'stream/consumers';

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/iniciar-sesion',
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (account?.provider == 'credentials') {
        token.data = {
          user: {
            ...user,
          },
        };

        return token;
      } else if (account?.provider == 'discord') {
        const data = {
          email: user.email || '',
          discordId: profile.id || '',
          username: user.name || '',
          access_token: account?.access_token || '',
          refresh_token: account?.refresh_token || '',
          avatar: user.image || '',
        };

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let extend = await fetch(
          'http://localhost:3001/api/auth/register-discord',
          {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
          }
        );
        let extendData = await extend.json();

        token.data = {
          user: {
            ...user,
            token: extendData.token,
            roles: extendData.roles,
          },
        };
      }

      return token;
    },

    session({ session, token, user }) {
      session.user = token.data as any;

      return session;
    },
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization:
        'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read',
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Realizar la solicitud de inicio de sesión al backend con correo y contraseña

        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (response.ok) {
          // Extraer el token JWT de la respuesta
          const data = await response.json();

          // Devolver el token JWT
          return data;
        } else {
          // Manejar errores de inicio de sesión
          const error = await response.text();
          throw new Error(error);
        }
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
