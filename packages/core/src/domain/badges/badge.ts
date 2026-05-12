import * as Schema from "effect/Schema";

export const BadgeId = Schema.String.pipe(
	Schema.brand("BadgeId"),
	Schema.annotate({
		title: "Badge ID",
		description: "Unique identifier for Badge.",
	}),
);

export type BadgeId = typeof BadgeId.Type;

export const BadgeSlug = Schema.String.pipe(
	Schema.brand("BadgeSlug"),
	Schema.annotate({
		title: "Badge Slug",
		description: "Unique slug for Badge.",
	}),
);

export type BadgeSlug = typeof BadgeSlug.Type;

export const BadgeName = Schema.String.pipe(
	Schema.annotate({
		title: "Badge ID",
		description: "Unique identifier for Badge.",
	}),
);

export const BadgeEmoji = Schema.String.pipe(
	Schema.annotate({
		title: "Badge Emoji",
		description: "Emoji icon for the Badge.",
	}),
);

export const BadgeDescription = Schema.String.pipe(
	Schema.annotate({
		title: "Badge Description",
		description: "What the user did to earn this badge.",
	}),
);

export class Badge extends Schema.Class<Badge>("Badge")(
	{
		id: BadgeId,
		name: BadgeName,
		slug: BadgeSlug,
		emoji: BadgeEmoji,
		description: BadgeDescription,
	},
	{
		title: "Badge",
	},
) {
	static decodeSingle = Schema.decodeUnknownSync(Badge);
	static decodeJsonSingle = Schema.decodeUnknownEffect(
		Schema.fromJsonString(Badge),
	);
}

export declare namespace Badge {
	export type Type = typeof Badge.Type;
	export type Encoded = Schema.Codec.Encoded<typeof Badge>;
}
