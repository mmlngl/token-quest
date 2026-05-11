import * as Schema from "effect/Schema";
import * as LLMs from "./llms";
import * as User from "./user";

export const SessionStatsId = Schema.String.pipe(
  Schema.brand("SessionStatsId"),
  Schema.annotate({
    title: "Session Stats ID",
    description: "Unique identifier for Session Stats.",
  }),
);

export type SessionStatsId = typeof SessionStatsId.Type;

export class SessionStats extends Schema.Class<SessionStats>("SessionStats")(
  {
    id: SessionStatsId,
    userId: User.UserId,
    provider: LLMs.Provider,
    model: LLMs.Model,
    tokenUsage: LLMs.TokenUsage,
    startedAt: Schema.DateFromString,
    endedAt: Schema.DateFromString,
  },
  {
    title: "Session Stats",
  },
) {
  static decodeSingle = Schema.decodeUnknownEffect(SessionStats);
  static decodeJsonSingle = Schema.decodeUnknownEffect(
    Schema.fromJsonString(SessionStats),
  );
}

export declare namespace SessionStats {
  export type Type = typeof SessionStats.Type;
  export type Encoded = Schema.Codec.Encoded<typeof SessionStats>;
}
