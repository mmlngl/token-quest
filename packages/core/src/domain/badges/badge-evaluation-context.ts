import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as User from "../user";

const NonNegativeInt = Schema.Int.pipe(
	Schema.check(Schema.isGreaterThanOrEqualTo(0)),
);

export const BadgeEvaluationContext = Schema.Struct({
	totalTokens: NonNegativeInt.pipe(
		Schema.annotate({
			title: "Total Tokens",
			description: "The total number of tokens the user has used",
		}),
	),
	totalSessions: NonNegativeInt.pipe(
		Schema.annotate({
			title: "Total Sessions",
			description: "The total number of sessions the user has submitted",
		}),
	),
	currentStreakDays: NonNegativeInt.pipe(
		Schema.annotate({
			title: "Current Streak Days",
			description:
				"How many consecutive days the user has submitted at least one session",
		}),
	),
	longestStreakDays: NonNegativeInt.pipe(
		Schema.annotate({
			title: "Longest Streak Days",
			description: "The longest streak the user has ever achieved",
		}),
	),
	uniqueModelCount: NonNegativeInt.pipe(
		Schema.annotate({
			title: "Unique Model Count",
			description: "Number of distinct models the user has used",
		}),
	),
	uniqueProviderCount: NonNegativeInt.pipe(
		Schema.annotate({
			title: "Unique Provider Count",
			description: "Number of distinct AI providers the user has used",
		}),
	),
}).pipe(
	Schema.annotate({
		title: "Badge Evaluation Context",
		description: "Context needed for evaluating badges",
	}),
);

export type BadgeEvaluationContext = typeof BadgeEvaluationContext.Type;

export interface BadgeEvaluationContextBuilderTrait {
	readonly buildForUserId: (
		userId: User.UserId,
	) => Effect.Effect<BadgeEvaluationContext>;
}

export class BadgeEvaluationContextBuilder extends Context.Service<
	BadgeEvaluationContextBuilder,
	BadgeEvaluationContextBuilderTrait
>()("@core/BadgeEvaluationContextBuilder") {}
