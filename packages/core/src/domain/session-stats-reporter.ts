import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as SessionStats from "./session-stats";

export class SessionStatsReportError extends Schema.TaggedErrorClass<SessionStatsReportError>()(
	"Core/SessionStatsReportError",
	{
		id: SessionStats.SessionStatsId,
		cause: Schema.Unknown,
	},
	{
		httpApiStatus: 500,
	},
) {}

export interface SessionStatsReporterTrait {
	readonly report: (
		stats: SessionStats.SessionStats,
	) => Effect.Effect<void, SessionStatsReportError>;
}

export class SessionStatsReporter extends Context.Service<
	SessionStatsReporter,
	SessionStatsReporterTrait
>()("Core/SessionStatsReporter") {}
