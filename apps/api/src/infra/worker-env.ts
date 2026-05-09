import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

export class WorkerEnv extends Context.Tag("WorkerEnv")<
	WorkerEnv,
	Cloudflare.Env
>() {
	static layerFromEnv = (env: Cloudflare.Env) => Layer.succeed(WorkerEnv, env);
}
