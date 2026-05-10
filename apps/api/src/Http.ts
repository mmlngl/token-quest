import * as Fn from "effect/Function";
import * as Layer from "effect/Layer";
import * as Http from "effect/unstable/http";
import * as P from "effect/unstable/httpapi";
import * as Api from "./Api";
import * as Health from "./Health/Http";
import * as Infra from "./infra";

export const makeHandler = (env: Env, ctx: ExecutionContext) => {
	const InfraLayer = Layer.mergeAll(
		Infra.WorkerEnv.WorkerEnv.layerFromEnv(env),
		Infra.ExecutionCtx.ExecutionCtx.layerFromCtx(ctx),
	);

	const appLayer = Layer.provide(
		P.HttpApiBuilder.layer(Api.Api),
		Layer.mergeAll(
			Http.HttpServer.layerServices,
			Health.HttpHealthLive.pipe(Layer.provide(InfraLayer)),
		),
	);

	return Http.HttpRouter.toWebHandler(appLayer, {
		middleware: Fn.flow(Http.HttpMiddleware.logger, Http.HttpMiddleware.cors()),
	});
};
