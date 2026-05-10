import * as P from "effect/unstable/httpapi";
import * as Health from "./Health/Api";

export class Api extends P.HttpApi.make("api")
	.add(Health.HealthApi)
	.prefix("/api/v1")
	.annotate(P.OpenApi.Title, "Usage Quest API") {}
