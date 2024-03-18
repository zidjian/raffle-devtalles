import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import type { NextAuthConfig } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { json } from "stream/consumers";

export const authConfig: NextAuthConfig = {
    trustHost: true,
    pages: {
        signIn: "/iniciar-sesion",
    },

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log({ user, account, profile, email, credentials });

            return true;
        },

        async jwt({ token, user, account, profile }) {
            if (account) {
                const data = {
                    email: user.email || "",
                    discordId: user.id || "",
                    username: user.name || "",
                    access_token: account?.access_token || "",
                    refresh_token: account?.refresh_token || "",
                    avatar: user.image || "",
                };

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                let extend = await fetch(
                    "http://localhost:3001/api/auth/register-discord",
                    {
                        method: "POST",
                        headers: myHeaders,
                        body: JSON.stringify(data),
                    }
                );
                let extendData = await extend.json();

                console.log(extendData);

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
                "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read",
        }),
    ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
