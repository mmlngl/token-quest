import * as Domain from "@token-quest/core/domain";
import * as A from "effect/Array";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as Model from "../../entities/badge/model";

export interface ReadonlyBadgeRepoTrait {
	readonly getForSlug: (
		slug: string,
	) => Effect.Effect<Option.Option<Model.BadgeModel>>;
}

export const make = Effect.gen(function* () {
	yield* Effect.void;

	const getForSlug: ReadonlyBadgeRepoTrait["getForSlug"] = Effect.fn(
		"getForSlug",
	)(function* (slug) {
		const maybeBadge = A.findFirst(
			Domain.Badges.BADGE_DEFINITIONS,
			(badge) => badge.badge.slug === slug,
		).pipe(Option.map((a) => a.badge));

		if (Option.isNone(maybeBadge)) return Option.none();
		const badge = maybeBadge.value;

		const badgeModel: Model.BadgeModel = {
			...badge,
		};

		return Option.some(badgeModel);
	});

	return ReadonlyBadgeRepo.of({
		getForSlug,
	});
});

export class ReadonlyBadgeRepo extends Context.Service<
	ReadonlyBadgeRepo,
	ReadonlyBadgeRepoTrait
>()("@web/ReadonlyBadgeRepo") {
	static readonly layer = Layer.effect(ReadonlyBadgeRepo, make);
}
