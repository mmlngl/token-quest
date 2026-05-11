import * as Api from "@token-quest/api";
import * as Core from "@token-quest/core/domain";
import * as Effect from "effect/Effect";
import * as P from "effect/unstable/httpapi";
import * as Contract from "./Contract";

export const HttpSessionStatsLive = P.HttpApiBuilder.group(
	Api.Api,
	"session-stats",
	(handlers) =>
		handlers
			.handle(
				"report",
				Effect.fnUntraced(function* ({ payload }) {
					const reporter =
						yield* Core.SessionStatsReporter.SessionStatsReporter;

					yield* reporter
						.report(payload.stats)
						.pipe(Effect.tapError((error) => Effect.logError(error)));

					const result = Contract.ReportSuccessSchema.make({
						isSuccess: true,
					});

					return result;
				}),
			)
			.handle(
				"sql",
				Effect.fnUntraced(function* ({ payload }) {
					const datastore =
						yield* Core.SessionStatsQueryEngine.SessionStatsQueryEngine;

					const data = yield* datastore.sql(payload.query);

					const result = Contract.QuerySqlSuccessSchema.make({
						response: data,
					});

					return result;
				}),
			),
);
