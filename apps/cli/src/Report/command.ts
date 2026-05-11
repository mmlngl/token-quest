import * as Core from "@token-quest/core/domain";
import * as Effect from "effect/Effect";
import { Argument, Command, Flag } from "effect/unstable/cli";
import * as Infra from "../infra";

const _name = Argument.string("name").pipe(Argument.withDefault("World"));
const _shout = Flag.boolean("shout").pipe(Flag.withAlias("s"));

export const command = Command.make("report", {}, () =>
  Effect.gen(function* () {
    const client = yield* Infra.Client.make;

    const stats = yield* Core.SessionStats.SessionStats.decodeSingle({
      id: "sess_01JWXK2M4P8N3Q7F",
      userId: "user_01JWXK1A9B2C3D4E",
      provider: "anthropic",
      model: "claude-sonnet-4",
      tokenUsage: {
        promptTokens: 1240,
        completionTokens: 387,
      },
      startedAt: "2026-05-10T09:15:00.000Z",
      endedAt: "2026-05-10T09:17:23.000Z",
    });

    const _op = yield* client["session-stats"].report({
      payload: {
        stats,
      },
    });
  }),
);
