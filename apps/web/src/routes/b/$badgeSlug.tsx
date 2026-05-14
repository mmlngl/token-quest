import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setResponseHeaders } from "@tanstack/react-start/server";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Option from "effect/Option";
import type * as BadgeEntity from "~entities/badge";
import { ReadonlyBadgeRepo, Runtime } from "~lib/services";
import { BadgeWidget } from "~lib/widgets/badge";
import * as UnderConstruction from "~widgets/under-constructions";

export interface BadgeLoaderData {
	badge: BadgeEntity.BadgeModel;
}

export const getData = createServerFn()
	.inputValidator((data: { badgeSlug: string }) => data)
	.handler(async ({ data: { badgeSlug } }) => {
		setResponseHeaders(
			new Headers({
				"Cache-Control": "public, max-age=300",
				"CDN-Cache-Control": "max-age=3600, stale-while-revalidate=600",
			}),
		);

		const program = Effect.gen(function* () {
			const Repo = yield* ReadonlyBadgeRepo.ReadonlyBadgeRepo;
			return yield* Repo.getForSlug(badgeSlug);
		});

		const exit = await Runtime.runtime.runPromiseExit(program);
		return Exit.match(exit, {
			onSuccess: (badgeOpt) =>
				Option.match(badgeOpt, {
					onSome: (badge) => ({ badge }) satisfies BadgeLoaderData,
					onNone: () => {
						throw notFound();
					},
				}),
			onFailure: (cause) => {
				throw new Error(`Failed to load badge\n${Cause.pretty(cause)}`);
			},
		});
	});

export const Route = createFileRoute("/b/$badgeSlug")({
	component: BadgeDetail,
	loader: ({ params: { badgeSlug } }) => getData({ data: { badgeSlug } }),
	staleTime: 30_000,
});

function BadgeDetail() {
	const { badge } = Route.useLoaderData();
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			<UnderConstruction.UnderConstruction />
			<BadgeWidget badge={badge} />
		</div>
	);
}
