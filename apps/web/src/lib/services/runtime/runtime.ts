import * as Layer from "effect/Layer";
import * as ManagedRuntime from "effect/ManagedRuntime";
import * as BadgeRepo from "./readonly-badge-repo";

export const InfraLayer = Layer.mergeAll(BadgeRepo.ReadonlyBadgeRepo.layer);

export const BuiltLayer = Layer.mergeAll(InfraLayer);

export const runtime = ManagedRuntime.make(BuiltLayer);
