import * as P from "@effect/platform";
import * as Health from "./Health/Api";
import * as Webhooks from "./Webhooks/Api";

export class Api extends P.HttpApi.make("api")
	.add(Webhooks.WebhooksApi)
	.add(Health.HealthApi)
	.prefix("/api/v1")
	.annotate(P.OpenApi.Title, "Relay AI API") {}
