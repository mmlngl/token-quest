import * as Effect from "effect/Effect";
import * as Badges from "./badge";
import * as Ctx from "./badge-evaluation-context";

export interface BadgeDefinition {
	readonly badge: Badges.Badge.Type;
	readonly condition: (
		ctx: Ctx.BadgeEvaluationContext,
	) => Effect.Effect<boolean>;
}

const def = (
	raw: {
		id: string;
		name: string;
		slug: string;
		emoji: string;
		description: string;
	},
	condition: (ctx: Ctx.BadgeEvaluationContext) => boolean,
): BadgeDefinition => ({
	badge: Badges.Badge.decodeSingle(raw),
	condition: (ctx) => Effect.succeed(condition(ctx)),
});

// --------------------------------------------------------
// 🌱  Beginner — almost everyone gets these
// --------------------------------------------------------

const firstStep = def(
	{
		id: "first-step",
		slug: "first-step",
		name: "First Step",
		emoji: "🐣",
		description: "Submit your first AI session. The journey starts here.",
	},
	(ctx) => ctx.totalSessions >= 1,
);

const spark = def(
	{
		id: "spark",
		slug: "spark",
		name: "Spark",
		emoji: "✨",
		description: "Cross 1,000 tokens. You're warming up.",
	},
	(ctx) => ctx.totalTokens >= 1_000,
);

const triplePlay = def(
	{
		id: "triple-play",
		slug: "triple-play",
		name: "Triple Play",
		emoji: "🎯",
		description: "Complete 3 sessions. Habit forming.",
	},
	(ctx) => ctx.totalSessions >= 3,
);

const kindling = def(
	{
		id: "kindling",
		slug: "kindling",
		name: "Kindling",
		emoji: "🔥",
		description: "3 days in a row. The streak has begun.",
	},
	(ctx) => ctx.currentStreakDays >= 3,
);

// --------------------------------------------------------
// 📈  Intermediate — you're clearly a regular
// --------------------------------------------------------

const pageTurner = def(
	{
		id: "page-turner",
		slug: "page-turner",
		name: "Page Turner",
		emoji: "📖",
		description: "Cross 10,000 tokens. You're not a casual.",
	},
	(ctx) => ctx.totalTokens >= 10_000,
);

const century = def(
	{
		id: "century",
		slug: "century",
		name: "Century",
		emoji: "💯",
		description: "100 sessions submitted. Respect.",
	},
	(ctx) => ctx.totalSessions >= 100,
);

const weekWarrior = def(
	{
		id: "week-warrior",
		slug: "week-warrior",
		name: "Week Warrior",
		emoji: "🏃",
		description: "7-day streak. A full week without breaking.",
	},
	(ctx) => ctx.currentStreakDays >= 7,
);

const labRat = def(
	{
		id: "lab-rat",
		slug: "lab-rat",
		name: "Lab Rat",
		emoji: "🔬",
		description: "Use 3 different models. Always experimenting.",
	},
	(ctx) => ctx.uniqueModelCount >= 3,
);

const deepDiver = def(
	{
		id: "deep-diver",
		slug: "deep-diver",
		name: "Deep Diver",
		emoji: "🌊",
		description: "Cross 100,000 tokens. You're in the deep end now.",
	},
	(ctx) => ctx.totalTokens >= 100_000,
);

const providerHopper = def(
	{
		id: "provider-hopper",
		slug: "provider-hopper",
		name: "Provider Hopper",
		emoji: "🏄",
		description: "Use 3 different AI providers. You bow to no single vendor.",
	},
	(ctx) => ctx.uniqueProviderCount >= 3,
);

// --------------------------------------------------------
// ⚡  Advanced — serious users only
// --------------------------------------------------------

const highVoltage = def(
	{
		id: "high-voltage",
		slug: "high-voltage",
		name: "High Voltage",
		emoji: "⚡",
		description: "Cross 500,000 tokens. This is getting expensive.",
	},
	(ctx) => ctx.totalTokens >= 500_000,
);

const ironclad = def(
	{
		id: "ironclad",
		slug: "ironclad",
		name: "Ironclad",
		emoji: "🦁",
		description: "30-day streak. Unbroken for a full month.",
	},
	(ctx) => ctx.currentStreakDays >= 30,
);

const scientist = def(
	{
		id: "scientist",
		slug: "scientist",
		name: "Scientist",
		emoji: "🧪",
		description: "Use 5 different models. A true researcher.",
	},
	(ctx) => ctx.uniqueModelCount >= 5,
);

const veteran = def(
	{
		id: "veteran",
		slug: "veteran",
		name: "Veteran",
		emoji: "🎖️",
		description: "1,000 sessions. You live here.",
	},
	(ctx) => ctx.totalSessions >= 1_000,
);

const oneMillion = def(
	{
		id: "one-million",
		slug: "one-million",
		name: "One Million Minds",
		emoji: "🧠",
		description: "Cross 1,000,000 tokens. A milestone most will never reach.",
	},
	(ctx) => ctx.totalTokens >= 1_000_000,
);

// --------------------------------------------------------
// 💎  Legendary — you need to be unwell to get these
// --------------------------------------------------------

const diamond = def(
	{
		id: "diamond",
		slug: "diamond",
		name: "Diamond",
		emoji: "💎",
		description: "100-day streak. Three months. Unreal.",
	},
	(ctx) => ctx.currentStreakDays >= 100,
);

const fiveMillionClub = def(
	{
		id: "five-million-club",
		slug: "five-million-club",
		name: "Five Million Club",
		emoji: "🏆",
		description: "Cross 5,000,000 tokens. What are you even building?",
	},
	(ctx) => ctx.totalTokens >= 5_000_000,
);

const elder = def(
	{
		id: "elder",
		slug: "elder",
		name: "Elder",
		emoji: "🏛️",
		description: "10,000 sessions. You are the AI.",
	},
	(ctx) => ctx.totalSessions >= 10_000,
);

const fullRevolution = def(
	{
		id: "full-revolution",
		slug: "full-revolution",
		name: "Full Revolution",
		emoji: "🌍",
		description: "365-day streak. A full year. Seek help.",
	},
	(ctx) => ctx.currentStreakDays >= 365,
);

const theMachine = def(
	{
		id: "the-machine",
		slug: "the-machine",
		name: "The Machine",
		emoji: "🤖",
		description: "Cross 10,000,000 tokens. You are no longer human.",
	},
	(ctx) => ctx.totalTokens >= 10_000_000,
);

const tokenLord = def(
	{
		id: "token-lord",
		slug: "token-lord",
		name: "Token Lord",
		emoji: "👑",
		description: "Cross 100,000,000 tokens. Bow down.",
	},
	(ctx) => ctx.totalTokens >= 100_000_000,
);

// --------------------------------------------------------
// 📋  Full catalogue — ordered easiest → hardest
// --------------------------------------------------------

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
	// Beginner
	firstStep,
	spark,
	triplePlay,
	kindling,

	// Intermediate
	pageTurner,
	century,
	weekWarrior,
	labRat,
	deepDiver,
	providerHopper,

	// Advanced
	highVoltage,
	ironclad,
	scientist,
	veteran,
	oneMillion,

	// Legendary
	diamond,
	fiveMillionClub,
	elder,
	fullRevolution,
	theMachine,
	tokenLord,
];
