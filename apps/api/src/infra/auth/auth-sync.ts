import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
	secret: process.env.BETTER_AUTH_SECRET ?? "cli-placeholder",
	baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost",
	database: drizzleAdapter({} as never, { provider: "sqlite" }),
	socialProviders: {
		github: {
			clientId: "fake",
			clientSecret: "fake",
		},
	},
});

export default auth;
