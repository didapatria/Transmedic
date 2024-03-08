import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await login(email);
                if(user) {
                    const passwordConfirm = await compare(password, user.password);
                    if(passwordConfirm) {
                        return user;
                    }
                    return null;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === "credentials") {
                token.fullname = user.fullname;
                token.email = user.email;
                token.address = user.address;
                token.phoneNumber = user.phoneNumber;
                token.drivingLicense = user.drivingLicense;
                token.role = user.role;
            }

            return token;
        },

        async session({ session, token }: any) {
            if ("fullname" in token) {
                session.user.fullname = token.fullname;
            }
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("address" in token) {
                session.user.address = token.address;
            }
            if ("phoneNumber" in token) {
                session.user.phoneNumber = token.phoneNumber;
            }
            if ("drivingLicense" in token) {
                session.user.drivingLicense = token.drivingLicense;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }

            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };