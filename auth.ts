import NextAuth from "next-auth";
import authOptions from "./auth.config";
import db from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		async session({ token, session }) {
			console.log({ sessionToken: token });
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (token.role && session.user) {
				session.user.role = token.role;
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;

			token.role = existingUser.role;

			return token;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	...authOptions,
});
