import * as P from "@effect/platform";
import * as Fn from "effect/Function";
import * as Layer from "effect/Layer";
import * as Api from "./Api";
import * as Health from "./Health/Http";
import * as HTTP from "./Http";
import * as Infra from "./infra";

const ModulesLayer = Layer.mergeAll(Health.HttpHealthLive);

export const ApiLive = Layer.provide(
	P.HttpApiBuilder.api(Api.Api),
	ModulesLayer,
);

export const makeHandler = (env: Env, ctx: ExecutionContext) => {
	const InfraLayer = Layer.mergeAll(
		Infra.WorkerEnv.WorkerEnv.layerFromEnv(env),
		Infra.ExecutionCtx.ExecutionCtx.layerFromCtx(ctx),
	);

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
