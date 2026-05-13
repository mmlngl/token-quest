import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as Config from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Db from "../db";
import * as WorkerEnv from "../worker-env";

export class AuthConfigOverrides extends Context.Service<
	AuthConfigOverrides,
	BetterAuthOptions
>()("AuthConfigOverrides") {
	static empty = Layer.succeed(AuthConfigOverrides, {});

	static layerWithConfig = (config: BetterAuthOptions) =>
		Layer.succeed(AuthConfigOverrides, config);
}

export class AuthConfig extends Context.Service<
	AuthConfig,
	BetterAuthOptions
>()("AuthConfig") {
	static layer = Layer.effect(
		AuthConfig,
		Effect.gen(function* () {
			const env = yield* WorkerEnv.WorkerEnv;
			const secret = yield* Config.redacted("BETTER_AUTH_SECRET");
			const trustedOrigins = yield* Config.string("TRUSTED_ORIGINS").pipe(
				Config.map((s) => s.split(",").map((o) => o.trim())),
				Config.withDefault([] as string[]),
			);
			const baseURL = yield* Config.string("BETTER_AUTH_URL");

			const overrides = yield* Effect.serviceOption(AuthConfigOverrides).pipe(
				Effect.map((a) => Option.getOrElse(a, () => ({}) as BetterAuthOptions)),
			);

			const database = drizzleAdapter(yield* Db.DB, {
				provider: "sqlite",
			});

			const config: BetterAuthOptions = {
				baseURL,
				rateLimit: {
					enabled: true,
					window: 60,
					max: 100,
				},
				experimental: { joins: true },
				secret: Redacted.value(secret),
				database,
				trustedOrigins,
				socialProviders: {
					github: {
						clientId: env.AUTH_GITHUB_CLIENT_ID,
						clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
					},
				},
				...overrides,
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
	static layer = Layer.effect(Auth, make);
}
