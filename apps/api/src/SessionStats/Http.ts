import * as Api from "@token-quest/api";
import * as Core from "@token-quest/core/domain";
import * as Effect from "effect/Effect";
import * as P from "effect/unstable/httpapi";

export const HttpSessionStatsLive = P.HttpApiBuilder.group(
	Api.Api,
	"session-stats",
	(handlers) =>
		handlers.handle(
			"report",
			Effect.fnUntraced(function* ({ payload }) {
				const reporter = yield* Core.SessionStatsReporter.SessionStatsReporter;

				yield* reporter
					.report(payload.stats)
					.pipe(Effect.tapError((error) => Effect.logError(error)));

				const result = Api.SessionStats.ReportSuccessSchema.make({
					isSuccess: true,
				});

				return result;
			}),
		),
);
