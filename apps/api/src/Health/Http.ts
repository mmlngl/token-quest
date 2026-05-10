import * as Effect from "effect/Effect";
import * as Http from "effect/unstable/http";
import * as P from "effect/unstable/httpapi";
import * as Api from "../Api";

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
