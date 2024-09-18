import type { NextAuthConfig } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export default {
	providers: [
		github({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		google,
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					const user = await getUserByEmail(email);
					if (!user || !user.password) {
						return null;
					}
					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (passwordsMatch) {
						return user;
					}
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
