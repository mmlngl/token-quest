import * as Core from "@token-quest/core/domain";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Match from "effect/Match";
import * as WorkerEnv from "./worker-env";

const toAnalyticsDataPoint = (
	stats: Core.SessionStats.SessionStats,
): AnalyticsEngineDataPoint => {
	const promptTokens = stats.tokenUsage.promptTokens;
	const completionTokens = stats.tokenUsage.completionTokens;
	const totalTokens = promptTokens + completionTokens;

	return {
		indexes: [stats.userId],
		doubles: [
			promptTokens,
			completionTokens,
			totalTokens,
			stats.startedAt.getTime(),
			stats.endedAt.getTime(),
		],
		blobs: [
			stats.id,
			stats.provider,
			stats.model,
			stats.startedAt.toISOString(),
			stats.endedAt.toISOString(),
		],
	};
};

export const make = Effect.gen(function* () {
	const bindings = yield* WorkerEnv.WorkerEnv;

	const ANALYTICS = yield* Config.literals(["dev", "prod"]).pipe(
		Config.withDefault("dev"),
		Config.map((env) =>
			Match.value(env).pipe(
				Match.when("dev", () => bindings.ANALYTICS_DEV),
				Match.when("prod", () => bindings.ANALYTICS_PROD),
				Match.exhaustive,
			),
		),
	);

	const report: Core.SessionStatsReporter.SessionStatsReporterTrait["report"] =
		Effect.fn("session-stats-reporter.report")(function* (stats) {
			const dataPoint = toAnalyticsDataPoint(stats);
			yield* Effect.try({
				try: () => ANALYTICS.writeDataPoint(dataPoint),
				catch: (cause) =>
					new Core.SessionStatsReporter.SessionStatsReportError({
						id: stats.id,
						cause: cause instanceof Error ? cause.message : String(cause),
					}),
			}).pipe(Effect.tapError((error) => Effect.logError(error)));

			yield* Effect.logInfo("Session Stats Reported");
		});

	return Core.SessionStatsReporter.SessionStatsReporter.of({ report });
});

export const layer = Layer.effect(
	Core.SessionStatsReporter.SessionStatsReporter,
	make,
);
