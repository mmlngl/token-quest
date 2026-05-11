import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

export class SessionStatsQueryEngineError extends Schema.TaggedErrorClass<SessionStatsQueryEngineError>()(
  "Core/SessionStatsQueryEngineError",
  {
    cause: Schema.Unknown,
  },
  {
    httpApiStatus: 500,
  },
) {}

export interface SessionStatsQueryEngineTrait {
  readonly sql: (
    query: string,
  ) => Effect.Effect<Schema.Json, SessionStatsQueryEngineError>;
}

export class SessionStatsQueryEngine extends Context.Service<
  SessionStatsQueryEngine,
  SessionStatsQueryEngineTrait
>()("Core/SessionStatsQueryEngine") {}
