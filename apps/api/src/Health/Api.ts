import * as P from "effect/unstable/httpapi";

export class HealthApi extends P.HttpApiGroup.make("health")
	.add(P.HttpApiEndpoint.get("health", "/"))
	.prefix("/health") {}
