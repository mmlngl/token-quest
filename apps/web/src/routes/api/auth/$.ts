import { createFileRoute } from "@tanstack/react-router";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Auth from "~lib/services/auth";
import * as Runtime from "~lib/services/runtime.server";

const handler = async ({ request }: { request: Request }) => {
	const program = Effect.gen(function* () {
		const auth = yield* Auth.Auth;
		return yield* Effect.tryPromise(() => auth.handler(request));
	});

	const exit = await Runtime.runtime.runPromiseExit(program);
	return Exit.match(exit, {
		onSuccess: (resp) => resp,
		onFailure: (cause) => {
			throw new Error(`Failed with error\n${Cause.pretty(cause)}`);
		},
	});
};

export const Route = createFileRoute("/api/auth/$")({
	server: {
		handlers: {
			GET: ({ request }: { request: Request }) => handler({ request }),
			POST: ({ request }: { request: Request }) => handler({ request }),
		},
	},
});
