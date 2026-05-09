import * as P from "@effect/platform";
import * as Api from "../Api";

export const HttpHealthLive = P.HttpApiBuilder.group(
	Api.Api,
	"health",
	(handlers) =>
		handlers.handle("health", () => P.HttpServerResponse.text("ok")),
);
