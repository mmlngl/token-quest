import * as Api from "@token-quest/api";
import * as Fn from "effect/Function";
import * as Layer from "effect/Layer";
import * as ManagedRuntime from "effect/ManagedRuntime";
import * as Http from "effect/unstable/http";
import * as P from "effect/unstable/httpapi";
import * as Health from "./Health/Http";
import * as Infra from "./infra";
import * as SessionStats from "./SessionStats/Http";

export const makeHandler = (env: Env, ctx: ExecutionContext) => {
	const CfLayer = Layer.mergeAll(
		Infra.WorkerEnv.WorkerEnv.layerFromEnv(env),
		Infra.ExecutionCtx.ExecutionCtx.layerFromCtx(ctx),
		Http.FetchHttpClient.layer,
	);

	const InfraLayer = Layer.mergeAll(
		Infra.SessionStatsReport.layer,
		Infra.SessionStatsQueryEngine.layer,
	).pipe(Layer.provide(CfLayer));

	const ApiLayer = Layer.mergeAll(
		Health.HttpHealthLive.pipe(Layer.provide(InfraLayer)),
		SessionStats.HttpSessionStatsLive.pipe(Layer.provide(InfraLayer)),
	);

	const FinalLayer = Layer.provide(
		P.HttpApiBuilder.layer(Api.Api),
		Layer.mergeAll(Http.HttpServer.layerServices, ApiLayer),
	);

	return {
		handler: Http.HttpRouter.toWebHandler(FinalLayer, {
			middleware: Fn.flow(
				Http.HttpMiddleware.logger,
				Http.HttpMiddleware.cors(),
			),
		}),
		runtime: ManagedRuntime.make(InfraLayer),
	};
};
