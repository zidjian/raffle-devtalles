import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import type { NextAuthConfig } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";

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

        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }

            return token;
        },

        session({ session, token, user }) {
            session.user = token.data as any;

            return session;
        },
    },
    providers: [
        // Credentials({
        //     async authorize(credentials) {
        //         const parsedCredentials = z
        //             .object({
        //                 email: z.string().email(),
        //                 password: z.string().min(6),
        //             })
        //             .safeParse(credentials);

        //         console.log("datos del foumlarios", parsedCredentials);
        //         if (!parsedCredentials.success) return null;

        //         const { email, password } = parsedCredentials.data;

        //         // Buscar el correo
        //         const user = await prisma.user.findUnique({
        //             where: { email: email.toLowerCase() },
        //         });
        //         console.log("base de datos", user);
        //         if (!user) return null;

        //         console.log("comparar", !bcrypt.compareSync(password, user.password));
        //         // Comparar las contraseñas
        //         if (!bcrypt.compareSync(password, user.password)) return null;

        //         // Regresar el usuario sin el password
        //         const { password: _, ...rest } = user;

        //         console.log("final", rest);
        //         return rest;
        //     },
        // }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization:
              "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read",
        }),
    ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
