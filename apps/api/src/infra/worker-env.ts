import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

export class WorkerEnv extends Context.Service<WorkerEnv, Cloudflare.Env>()(
	"Api/WorkerEnv",
) {
	static layerFromEnv = (env: Cloudflare.Env) => Layer.succeed(WorkerEnv, env);
}
