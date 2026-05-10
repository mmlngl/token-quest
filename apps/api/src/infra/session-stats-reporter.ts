import * as Core from "@token-quest/core/domain";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as WorkerEnv from "./worker-env";

const toAnalyticsDataPoint = (
	stats: Core.SessionStats.SessionStats,
): AnalyticsEngineDataPoint => {
	const promptTokens = stats.tokenUsage.promptTokens;
	const completionTokens = stats.tokenUsage.completionTokens;
	const totalTokens = promptTokens + completionTokens;

	return {
		indexes: [stats.userId, stats.provider, stats.model],
		doubles: [
			promptTokens,
			completionTokens,
			totalTokens,
			stats.startedAt.getTime(),
			stats.endedAt.getTime(),
		],
		blobs: [
			stats.id,
			stats.startedAt.toISOString(),
			stats.endedAt.toISOString(),
		],
	};
};

export const make = Effect.gen(function* () {
	const env = yield* WorkerEnv.WorkerEnv;

	const report: Core.SessionStatsReporter.SessionStatsReporterTrait["report"] =
		Effect.fn("session-stats-reporter.report")(function* (stats) {
			yield* Effect.try({
				try: () => env.ANALYTICS.writeDataPoint(toAnalyticsDataPoint(stats)),
				catch: (cause) =>
					new Core.SessionStatsReporter.SessionStatsReportError({
						id: stats.id,
						cause,
					}),
			});
		});

	return Core.SessionStatsReporter.SessionStatsReporter.of({ report });
});

export const layer = Layer.effect(
	Core.SessionStatsReporter.SessionStatsReporter,
	make,
);
