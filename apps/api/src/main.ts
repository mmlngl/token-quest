import { WorkerEntrypoint } from "cloudflare:workers";
import * as Core from "@token-quest/core/domain";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Http from "./Http";
import * as Auth from "./infra/auth/auth-client";

export default class ApiWorker extends WorkerEntrypoint {
	async fetch(request: Request) {
		const { dispose, handler } = Http.makeHandler(this.env, this.ctx).handler;
		const response = await (handler as (request: Request) => Promise<Response>)(
			request,
		);
		await dispose();
		return response;
	}

	async sql(query: string) {
		const runtime = Http.makeHandler(this.env, this.ctx).runtime;
		const program = Effect.gen(function* () {
			const QueryEngine =
				yield* Core.SessionStatsQueryEngine.SessionStatsQueryEngine;
			const result = yield* QueryEngine.sql(query);
			return {
				result,
			};
		});

		const exit = await runtime.runPromiseExit(program);
		return Exit.match(exit, {
			onFailure: (cause) => {
				throw new Error(Cause.pretty(cause));
			},
			onSuccess: (v) => v,
		});
	}

	async getAuth() {
		return Auth.authClient;
	}
}
