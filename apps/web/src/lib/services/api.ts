import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as WorkerEnv from "./worker-env.server";

export interface ApiTrait {
	use: <T>(cb: (api: Cloudflare.Env["API"]) => Promise<T>) => Effect.Effect<T>;
}

const make = Effect.gen(function* () {
	const env = yield* WorkerEnv.WorkerEnv;
	const use: ApiTrait["use"] = (cb) => Effect.tryPromise(() => cb(env.API));

	return Api.of({
		use,
	});
});

export class Api extends Context.Service<Api, ApiTrait>()("Web/Api") {
	static layer = Layer.effect(Api, make);
}
