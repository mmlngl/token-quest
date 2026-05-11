import * as N from "@effect/platform-node";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { Command } from "effect/unstable/cli";
import pkg from "../package.json" with { type: "json" };
import * as Report from "./Report";

const tokenQuest = Command.make(
  "TokenQuest",
  {},
  Effect.fn(function* () {}),
);

const InfraLayer = Layer.mergeAll(N.NodeHttpClient.layerUndici);

const CombinedCommands = tokenQuest.pipe(
  Command.withSubcommands([Report.command]),
);

const program = Command.run(CombinedCommands, {
  version: pkg.version,
});

const runnable = program.pipe(Effect.provide(InfraLayer));

runnable.pipe(Effect.provide(N.NodeServices.layer), N.NodeRuntime.runMain);
