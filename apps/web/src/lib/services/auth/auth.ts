import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as Config from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Db from "../db";
import * as AuthDefaults from "./auth-defaults";

export class AuthConfig extends Context.Service<
	AuthConfig,
	BetterAuthOptions
>()("AuthConfig") {
	static layer = Layer.effect(
		AuthConfig,
		Effect.gen(function* () {
			const vars = yield* Config.all({
				secret: Config.redacted("BETTER_AUTH_SECRET"),
				baseURL: Config.string("BETTER_AUTH_URL"),
				githubClientId: Config.redacted("AUTH_GITHUB_CLIENT_ID"),
				githubClientSecret: Config.redacted("AUTH_GITHUB_CLIENT_SECRET"),
			});

			const database = drizzleAdapter(yield* Db.DB, {
				provider: "sqlite",
			});

			const config: BetterAuthOptions = {
				// Default
				...AuthDefaults.auth.options,

				// Additional Config and Overrides
				baseURL: vars.baseURL,
				rateLimit: {
					enabled: true,
					window: 60,
					max: 100,
				},
				secret: Redacted.value(vars.secret),
				database,
				socialProviders: {
					github: {
						clientId: Redacted.value(vars.githubClientId),
						clientSecret: Redacted.value(vars.githubClientSecret),
					},
				},
			};
			return config;
		}),
	);
}

export const make = Effect.gen(function* () {
	const config = yield* AuthConfig;
	return betterAuth(config);
});

export type AuthTrait = Effect.Success<typeof make>;

export class Auth extends Context.Service<Auth, AuthTrait>()("infra/Auth") {
	static layer = Layer.effect(Auth, make).pipe(Layer.provide(AuthConfig.layer));
}
