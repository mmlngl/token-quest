import { createFileRoute, notFound } from "@tanstack/react-router";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Option from "effect/Option";
import type * as BadgeEntity from "~entities/badge";
import { BadgeWidget } from "~lib/widgets/badge";
import * as Runtime from "~services/runtime";

export interface BadgeLoaderData {
	badge: BadgeEntity.BadgeModel;
}

export const Route = createFileRoute("/b/$badgeSlug")({
	component: BadgeDetail,
	loader: async ({ params: { badgeSlug } }) => {
		const program = Effect.gen(function* () {
			const Repo = yield* Runtime.ReadonlyBadgeRepo;
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
	},
});

function BadgeDetail() {
	const { badge } = Route.useLoaderData();
	return <BadgeWidget badge={badge} />;
}
