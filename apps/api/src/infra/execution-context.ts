import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

export class ExecutionCtx extends Context.Tag("ExecutionCtx")<
	ExecutionCtx,
	ExecutionContext
>() {
	static layerFromCtx = (ctx: ExecutionContext) =>
		Layer.succeed(ExecutionCtx, ctx);
}
