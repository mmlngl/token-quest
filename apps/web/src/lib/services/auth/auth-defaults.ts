import { apiKey } from "@better-auth/api-key";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
	// default Config
	experimental: { joins: true },
	plugins: [apiKey(), tanstackStartCookies()],

	// Placeholder values for local development
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
