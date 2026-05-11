import * as Core from "@token-quest/core/domain";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Http from "effect/unstable/http";

export const make = Effect.gen(function* () {
	const client = yield* Http.HttpClient.HttpClient;
	const config = yield* Config.all({
		API_TOKEN: Config.redacted("ANALYTICS_READONLY_API_TOKEN"),
		ACCOUNT_ID: Config.redacted("CLOUDFLARE_ACCOUNT_ID"),
	});

	const sql: Core.SessionStatsQueryEngine.SessionStatsQueryEngineTrait["sql"] =
		Effect.fn("session-stats-query-engine.sql")(function* (query) {
			const response = yield* client
				.post(
					`https://api.cloudflare.com/client/v4/accounts/${Redacted.value(config.ACCOUNT_ID)}/analytics_engine/sql`,
					{
						headers: {
							Authorization: `Bearer ${Redacted.value(config.API_TOKEN)}`,
						},
						body: Http.HttpBody.text(
							query,
							"application/x-www-form-urlencoded",
						),
					},
				)
				.pipe(
					Effect.mapError(
						(cause) =>
							new Core.SessionStatsQueryEngine.SessionStatsQueryEngineError({
								cause,
							}),
					),
				);

			if (response.status !== 200) {
				return yield* response.text.pipe(
					Effect.mapError(
						(cause) =>
							new Core.SessionStatsQueryEngine.SessionStatsQueryEngineError({
								cause,
							}),
					),
				);
			}

			return yield* response.json.pipe(
				Effect.mapError(
					(cause) =>
						new Core.SessionStatsQueryEngine.SessionStatsQueryEngineError({
							cause,
						}),
				),
			);
		});

	return Core.SessionStatsQueryEngine.SessionStatsQueryEngine.of({ sql });
});

export const layer = Layer.effect(
	Core.SessionStatsQueryEngine.SessionStatsQueryEngine,
	make,
);
