import * as Layer from "effect/Layer";
import * as ManagedRuntime from "effect/ManagedRuntime";
import * as Api from "./api";
import * as Auth from "./auth";
import * as Db from "./db";
import * as BadgeRepo from "./readonly-badge-repo";
import * as WorkerEnv from "./worker-env.server";

export const CfLayer = Layer.mergeAll(WorkerEnv.WorkerEnv.layerFromEnv);

const PersistenceLayer = Db.DB.layer.pipe(Layer.provideMerge(CfLayer));

export const ServicesLayer = Layer.mergeAll(
	BadgeRepo.ReadonlyBadgeRepo.layer,
	Api.Api.layer,
	Auth.Auth.layer,
).pipe(Layer.provideMerge(PersistenceLayer));

export const runtime = ManagedRuntime.make(ServicesLayer);
