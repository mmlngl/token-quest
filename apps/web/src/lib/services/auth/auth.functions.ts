import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Runtime from "../runtime.server";
import * as Auth from "./auth";

const sessionEffect = Effect.gen(function* () {
	const headers = yield* Effect.sync(() => getRequestHeaders());
	const auth = yield* Auth.Auth;
	const session = yield* Effect.tryPromise(() =>
		auth.api.getSession({ headers }),
	);
	return session;
});

export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const exit = await Runtime.runtime.runPromiseExit(sessionEffect);
		return Exit.match(exit, {
			onSuccess: (session) => session,
			onFailure: (cause) => {
				throw new Error(Cause.pretty(cause));
			},
		});
	},
);

export const ensureSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const program = Effect.gen(function* () {
			const session = yield* sessionEffect;
			if (!session) throw new Error("Unauthorized");
			return session;
		});
		const exit = await Runtime.runtime.runPromiseExit(program);
		return Exit.match(exit, {
			onSuccess: (session) => session,
			onFailure: (cause) => {
				throw new Error(Cause.pretty(cause));
			},
		});
	},
);
