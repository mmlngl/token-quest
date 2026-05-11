import * as Core from "@token-quest/core/domain";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { Command, Flag } from "effect/unstable/cli";
import * as Infra from "../infra";

const stats = Flag.string("stats").pipe(
  Flag.withDescription(
    'SessionStats as a JSON string, e.g. \'{ "id": "...", "userId": "...", ... }\'',
  ),
);

export const command = Command.make("report", { stats }, ({ stats }) =>
  Effect.gen(function* () {
    const client = yield* Infra.Client.make;

    const sessionStats =
      yield* Core.SessionStats.SessionStats.decodeJsonSingle(stats);

    yield* client["session-stats"].report({ payload: { stats: sessionStats } });

    yield* Console.log("Session reported.");
  }),
);
