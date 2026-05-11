import * as Api from "@token-quest/api";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import * as P from "effect/unstable/httpapi";

export const make = Effect.gen(function* () {
  const API_URL = yield* Config.url("TOKEN_QUEST_API_URL").pipe(
    Config.withDefault("http://localhost:8787"),
  );

  const client = yield* P.HttpApiClient.make(Api.Api, {
    baseUrl: API_URL,
  });

  return client;
});
