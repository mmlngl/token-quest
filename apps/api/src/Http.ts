import * as P from "@effect/platform";
import * as FetchHttpClient from "@effect/platform/FetchHttpClient";
import * as Line from "@mmlngl/effect-messagekit-provider-line";
import * as Fn from "effect/Function";
import * as Layer from "effect/Layer";
import * as Api from "./Api";
import * as Health from "./Health/Http";
import * as HTTP from "./Http";
import * as Infra from "./infra";
import * as Webhooks from "./Webhooks/Http";

const ModulesLayer = Layer.mergeAll(
	Health.HttpHealthLive,
	Webhooks.HttpWebhooksLive,
);

export const ApiLive = Layer.provide(
	P.HttpApiBuilder.api(Api.Api),
	ModulesLayer,
);

export const makeHandler = (env: Env, ctx: ExecutionContext) => {
	const CfLayer = Layer.mergeAll(
		Infra.WorkerEnv.WorkerEnv.layerFromEnv(env),
		Infra.ExecutionCtx.ExecutionCtx.layerFromCtx(ctx),
	);

	const LLMLayer = Layer.mergeAll(
		FetchHttpClient.layer,
		Mastra.MastraInstance.layer.pipe(
			Layer.provide(
				Mastra.MastraConfigOverride.MastraConfigOverride.make({
					storage: new D1.D1Store({
						id: "d1-storage",
						binding: env.DB,
						tablePrefix: "mastra_",
					}),
				}),
			),
		),
	);

	const clientsLayer = Layer.mergeAll(Infra.Clients.Line.layer);

	const middlewareLayer = Layer.mergeAll(
		Line.Middleware.LineWebhookAuthorization.layer,
		// Infra.Middlewares.WhatsappWebhookAuthorization.layer,
	).pipe(Layer.provide(clientsLayer));

	const InfraLayer = Layer.mergeAll(CfLayer, LLMLayer, middlewareLayer);

	return P.HttpApiBuilder.toWebHandler(
		Layer.mergeAll(
			P.HttpServer.layerContext,
			HTTP.ApiLive.pipe(Layer.provide(InfraLayer)),
		),
		{
			middleware: Fn.flow(P.HttpMiddleware.logger, P.HttpMiddleware.cors()),
		},
	);
};
