import * as Api from "@token-quest/api";
import * as Effect from "effect/Effect";
import * as Http from "effect/unstable/http";
import * as P from "effect/unstable/httpapi";

export const HttpHealthLive = P.HttpApiBuilder.group(
	Api.Api,
	"health",
	(handlers) =>
		handlers.handle("health", () =>
			Effect.succeed(
				Http.HttpServerResponse.empty({
					status: 204,
				}),
			),
		),
);
