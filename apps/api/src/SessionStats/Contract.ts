import * as Core from "@token-quest/core/domain";
import * as Schema from "effect/Schema";

export const ReportPayloadSchema = Schema.Struct({
	stats: Core.SessionStats.SessionStats,
}).pipe(Schema.annotate({ title: "Report Sessions Stats Payload" }));

export const ReportSuccessSchema = Schema.Struct({
	isSuccess: Schema.Boolean,
}).pipe(Schema.annotate({ title: "Report Sessions Stats Success" }));

export const ReportErrors = [Core.SessionStatsReporter.SessionStatsReportError];
