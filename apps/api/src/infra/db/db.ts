import { drizzle } from "drizzle-orm/d1";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as WorkerEnv from "../worker-env";
import * as schema from "./schema";

const make = (envs: Env) => {
	const db = drizzle(envs.DB, { schema });
	return db;
};

type DBType = ReturnType<typeof make>;

export class DB extends Context.Service<DB, DBType>()("DB") {
	static layer = Layer.effect(
		DB,
		Effect.gen(function* () {
			const envs = yield* WorkerEnv.WorkerEnv;
			return drizzle(envs.DB, { schema });
		}),
	);
}
