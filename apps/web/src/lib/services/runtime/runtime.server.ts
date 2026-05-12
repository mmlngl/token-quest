import * as Layer from "effect/Layer";
import * as ManagedRuntime from "effect/ManagedRuntime";
import * as Api from "./api";
import * as BadgeRepo from "./readonly-badge-repo";
import * as WorkerEnv from "./worker-env.server";

export const CfLayer = Layer.mergeAll(WorkerEnv.WorkerEnv.layerFromEnv);

export const InfraLayer = Layer.mergeAll(
	BadgeRepo.ReadonlyBadgeRepo.layer,
	Api.Api.layer,
).pipe(Layer.provide(CfLayer));

export const runtime = ManagedRuntime.make(InfraLayer);
