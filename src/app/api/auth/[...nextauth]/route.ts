import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";

const authOpstions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name
        })
    ]
}