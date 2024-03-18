import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            token: string;
            image?: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        token: string;
        roles: any;
    }
}
