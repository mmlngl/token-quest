import * as P from "effect/unstable/httpapi";
import * as Health from "./Health/Api";
import * as SessionStats from "./SessionStats/Api";

export class Api extends P.HttpApi.make("api")
	.add(Health.HealthApi)
	.add(SessionStats.SessionStatsApi)
	.prefix("/api/v1")
	.annotate(P.OpenApi.Title, "Token Quest API") {}
