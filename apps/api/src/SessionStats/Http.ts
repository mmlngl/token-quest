import * as Core from "@token-quest/core/domain";
import * as Effect from "effect/Effect";
import * as P from "effect/unstable/httpapi";
import * as Api from "../Api";
import * as Contract from "./Contract";

export const HttpSessionStatsLive = P.HttpApiBuilder.group(
	Api.Api,
	"session-stats",
	(handlers) =>
		handlers.handle("report", ({ payload }) =>
			Effect.gen(function* () {
				const reporter = yield* Core.SessionStatsReporter.SessionStatsReporter;

				yield* reporter.report(payload.stats);

				const result = Contract.ReportSuccessSchema.make({
					isSuccess: true,
				});

				return result;
			}),
		),
);
