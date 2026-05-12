import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setResponseHeaders } from "@tanstack/react-start/server";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Runtime from "~services/runtime";
import * as UnderConstruction from "~widgets/under-constructions";

export const getData = createServerFn({
	strict: false,
}).handler(async () => {
	setResponseHeaders(
		new Headers({
			"Cache-Control": "public, max-age=300",
			"CDN-Cache-Control": "max-age=3600, stale-while-revalidate=600",
		}),
	);
	const program = Effect.gen(function* () {
		const Api = yield* Runtime.Api.Api;
		const result = yield* Api.use((api) =>
			api.sql(
				`SELECT blob1 AS session_id,
                index1 AS user_id,
                blob2 AS provider,
                blob3 AS model,
                double1 AS prompt_tokens,
                double2 AS completion_tokens,
                double3 AS total_tokens,
                blob4 AS started_at,
                blob5 AS ended_at
          FROM token_quest_session_stats_dev
          WHERE timestamp > NOW() - INTERVAL '1' DAY`,
			),
		);
		return result;
	});

	const exit = await Runtime.Runtime.runtime.runPromiseExit(program);
	return Exit.match(exit, {
		onSuccess: (result) => result,
		onFailure: (cause) => {
			throw new Error(`Failed to requester\n${Cause.pretty(cause)}`);
		},
	});
});

export const Route = createFileRoute("/p/$questerHandle")({
	component: QuesterProfile,
	loader: () => getData(),
	staleTime: 30_000,
});

// ─── Data shapes ────────────────────────────────────────────────────────────

type Rarity = "common" | "rare" | "legendary";

interface Badge {
	id: string;
	name: string;
	description: string;
	category:
		| "milestone"
		| "consistency"
		| "competitive"
		| "exploration"
		| "constraint";
	rarity: Rarity;
	symbol: string;
	earned: string | null; // ISO date string or null if locked
}

// ─── Mock quester ────────────────────────────────────────────────────────────

const QUESTER = {
	handle: "voxelmancer",
	since: "May 2026",
	totalTokens: 4_231_876,
	totalSessions: 847,
	currentStreak: 12,
	bestStreak: 21,
	dailyRank: 1,
	weeklyRank: 2,
	allTimeRank: 14,
	topProvider: "Anthropic",
	topModel: "claude-sonnet-4",
};

const BADGES: Badge[] = [
	// Earned — milestone
	{
		id: "first-signal",
		name: "First Signal",
		description: "Reported your first session",
		category: "milestone",
		rarity: "common",
		symbol: "◆",
		earned: "2026-05-01",
	},
	{
		id: "ten-thousand",
		name: "Ten Thousand",
		description: "10,000 total tokens burned",
		category: "milestone",
		rarity: "common",
		symbol: "▲",
		earned: "2026-05-02",
	},
	{
		id: "hundred-thousand",
		name: "Hundred Thousand",
		description: "100,000 total tokens burned",
		category: "milestone",
		rarity: "rare",
		symbol: "▲▲",
		earned: "2026-05-05",
	},
	{
		id: "million-club",
		name: "Million Club",
		description: "1,000,000 total tokens burned",
		category: "milestone",
		rarity: "legendary",
		symbol: "★",
		earned: "2026-05-08",
	},
	// Earned — competitive
	{
		id: "podium-finish",
		name: "Podium Finish",
		description: "Finished top 10 in a daily ranking",
		category: "competitive",
		rarity: "rare",
		symbol: "■",
		earned: "2026-05-06",
	},
	{
		id: "daily-champion",
		name: "Daily Champion",
		description: "#1 on the daily leaderboard",
		category: "competitive",
		rarity: "legendary",
		symbol: "■■",
		earned: "2026-05-10",
	},
	// Earned — consistency
	{
		id: "three-day-streak",
		name: "Three Day Streak",
		description: "Used AI 3 days in a row",
		category: "consistency",
		rarity: "common",
		symbol: "●",
		earned: "2026-05-03",
	},
	{
		id: "week-warrior",
		name: "Week Warrior",
		description: "7-day activity streak",
		category: "consistency",
		rarity: "rare",
		symbol: "●●",
		earned: "2026-05-07",
	},
	// Earned — exploration
	{
		id: "multi-model",
		name: "Multi-Model",
		description: "Used 3 different models in one week",
		category: "exploration",
		rarity: "common",
		symbol: "◇",
		earned: "2026-05-04",
	},
	// Locked — aspirational
	{
		id: "iron-streak",
		name: "Iron Streak",
		description: "30-day activity streak",
		category: "consistency",
		rarity: "legendary",
		symbol: "●●●",
		earned: null,
	},
	{
		id: "ten-million",
		name: "Inferno Class",
		description: "10,000,000 total tokens burned",
		category: "milestone",
		rarity: "legendary",
		symbol: "★★",
		earned: null,
	},
	{
		id: "monthly-monarch",
		name: "Monthly Monarch",
		description: "#1 on the monthly leaderboard",
		category: "competitive",
		rarity: "legendary",
		symbol: "♛",
		earned: null,
	},
];

const RECENT = [
	{
		model: "claude-sonnet-4",
		tokens: 84_231,
		duration: "2h 14m",
		date: "Today",
	},
	{ model: "gpt-4.1", tokens: 34_876, duration: "47m", date: "Today" },
	{
		model: "claude-sonnet-4",
		tokens: 112_043,
		duration: "3h 02m",
		date: "Yesterday",
	},
	{
		model: "claude-sonnet-4",
		tokens: 67_412,
		duration: "1h 38m",
		date: "Yesterday",
	},
	{ model: "gpt-4.1", tokens: 29_341, duration: "31m", date: "08 May" },
];

// ─── Badge component ─────────────────────────────────────────────────────────

const RARITY_ACCENT: Record<Rarity, string> = {
	common: "bg-foreground",
	rare: "bg-foreground",
	legendary: "bg-primary",
};

const RARITY_LABEL: Record<Rarity, string> = {
	common: "Common",
	rare: "Rare",
	legendary: "Legendary",
};

function BadgeTile({
	badge,
	size = "sm",
}: {
	badge: Badge;
	size?: "sm" | "lg";
}) {
	const earned = badge.earned !== null;
	const isLg = size === "lg";

	if (!earned) {
		return (
			<div className="border border-dashed border-foreground/30 flex flex-col p-4 opacity-40 select-none aspect-square justify-between">
				<span className="font-mono text-xs tracking-widest opacity-50">
					LOCKED
				</span>
				<div>
					<div
						className={`font-black ${isLg ? "text-5xl" : "text-2xl"} opacity-20`}
					>
						{badge.symbol}
					</div>
					<div
						className={`font-black uppercase tracking-tight mt-2 ${isLg ? "text-xl" : "text-xs"} leading-tight`}
					>
						{badge.name}
					</div>
				</div>
				<span className="font-mono text-xs opacity-40 uppercase tracking-widest">
					{RARITY_LABEL[badge.rarity]}
				</span>
			</div>
		);
	}

	const isLegendary = badge.rarity === "legendary";

	return (
		<div
			className={`flex flex-col aspect-square justify-between border border-foreground ${isLegendary ? "bg-primary" : "bg-foreground text-background"}`}
		>
			{/* Rarity accent bar */}
			<div
				className={`h-1.5 w-full ${isLegendary ? "bg-foreground" : RARITY_ACCENT[badge.rarity]}`}
			/>
			<div
				className={`px-4 pb-4 flex flex-col gap-2 ${isLg ? "px-6 pb-6" : ""}`}
			>
				<div
					className={`font-black ${isLg ? "text-6xl" : "text-3xl"} leading-none mt-2`}
				>
					{badge.symbol}
				</div>
				<div
					className={`font-black uppercase tracking-tight leading-tight ${isLg ? "text-2xl mt-2" : "text-sm mt-1"}`}
				>
					{badge.name}
				</div>
				<div
					className={`font-mono ${isLg ? "text-sm" : "text-xs"} opacity-60 leading-snug`}
				>
					{badge.description}
				</div>
				<div
					className={`font-mono ${isLg ? "text-xs" : "text-[10px]"} opacity-40 uppercase tracking-widest mt-1`}
				>
					{badge.earned
						? new Date(badge.earned)
								.toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "short",
									year: "numeric",
								})
								.toUpperCase()
						: ""}
				</div>
			</div>
		</div>
	);
}

const fmt = (n: number) =>
	n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M` : n.toLocaleString();

// ─── Page ────────────────────────────────────────────────────────────────────

function QuesterProfile() {
	const result = Route.useLoaderData();

	const earned = BADGES.filter((b) => b.earned !== null);
	const locked = BADGES.filter((b) => b.earned === null);

	// Featured = rarest earned badge (legendary > rare > common), most recent
	const featured = [...earned].sort((a, b) => {
		const order: Record<Rarity, number> = { legendary: 0, rare: 1, common: 2 };
		return order[a.rarity] - order[b.rarity];
	})[0];

	const rest = earned.filter((b) => b.id !== featured?.id);

	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			<h1 className="text-2xl">
				<pre>{JSON.stringify(result.result, null, 2)}</pre>
			</h1>
			<UnderConstruction.UnderConstruction />

			{/* Header */}
			<header className="bg-foreground text-background flex items-center justify-between px-8 py-4 border-b border-foreground">
				<Link
					to="/"
					className="font-mono text-xs tracking-widest uppercase opacity-60 hover:opacity-100"
				>
					← Token Quest
				</Link>
				<span className="font-mono text-xs opacity-40 uppercase tracking-widest">
					Quester Profile
				</span>
			</header>

			{/* Hero */}
			<div className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
				{/* Handle + identity */}
				<div className="md:col-span-8 p-8 md:p-16 border-b md:border-b-0 md:border-r border-foreground flex flex-col justify-between">
					<span className="font-mono text-xs tracking-widest opacity-40 uppercase">
						Quester / {QUESTER.handle}
					</span>
					<div>
						<h1 className="text-[13vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter uppercase mt-6">
							{QUESTER.handle}
						</h1>
						<div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-foreground font-mono text-xs uppercase tracking-widest opacity-60">
							<span>Since {QUESTER.since}</span>
							<span>·</span>
							<span>{QUESTER.totalSessions} Sessions</span>
							<span>·</span>
							<span>{QUESTER.topModel}</span>
						</div>
					</div>
				</div>

				{/* Ranks + stats */}
				<div className="md:col-span-4 flex flex-col">
					{[
						{
							label: "Daily Rank",
							value: `#${QUESTER.dailyRank}`,
							accent: true,
						},
						{
							label: "Weekly Rank",
							value: `#${QUESTER.weeklyRank}`,
							accent: false,
						},
						{
							label: "Total Tokens",
							value: fmt(QUESTER.totalTokens),
							accent: false,
						},
						{
							label: "Current Streak",
							value: `${QUESTER.currentStreak} Days 🔥`,
							accent: false,
						},
					].map(({ label, value, accent }, i, arr) => (
						<div
							key={label}
							className={`p-6 flex flex-col justify-between flex-1 ${accent ? "bg-primary" : "bg-background"} ${i < arr.length - 1 ? "border-b border-foreground" : ""}`}
						>
							<span className="font-mono text-xs tracking-widest uppercase opacity-60">
								{label}
							</span>
							<span className="font-black text-3xl uppercase tracking-tight mt-2">
								{value}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Badges */}
			<div className="border-b border-foreground">
				{/* Section label */}
				<div className="bg-foreground text-background px-8 py-3 flex items-center justify-between">
					<span className="font-black text-sm uppercase tracking-widest">
						Badges
					</span>
					<span className="font-mono text-xs opacity-60">
						{earned.length} earned · {locked.length} locked
					</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-12">
					{/* Featured badge */}
					{featured && (
						<div className="md:col-span-4 border-b md:border-b-0 md:border-r border-foreground p-6">
							<div className="font-mono text-xs tracking-widest uppercase opacity-40 mb-4">
								Top Achievement
							</div>
							<BadgeTile badge={featured} size="lg" />
						</div>
					)}

					{/* Earned grid */}
					<div className="md:col-span-8 p-6">
						<div className="font-mono text-xs tracking-widest uppercase opacity-40 mb-4">
							Earned
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
							{rest.map((badge) => (
								<BadgeTile key={badge.id} badge={badge} />
							))}
						</div>
					</div>
				</div>

				{/* Locked — aspirational */}
				{locked.length > 0 && (
					<div className="border-t border-foreground p-6">
						<div className="font-mono text-xs tracking-widest uppercase opacity-40 mb-4">
							Next Targets
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
							{locked.map((badge) => (
								<BadgeTile key={badge.id} badge={badge} />
							))}
						</div>
					</div>
				)}
			</div>

			{/* Recent sessions */}
			<div className="border-b border-foreground">
				<div className="bg-foreground text-background px-8 py-3">
					<span className="font-black text-sm uppercase tracking-widest">
						Recent Sessions
					</span>
				</div>
				{RECENT.map((s, i) => (
					<div
						key={`${s.date}-${i.toString()}`}
						className={`grid grid-cols-12 items-center px-8 py-4 hover:bg-primary transition-colors ${i < RECENT.length - 1 ? "border-b border-foreground" : ""}`}
					>
						<span className="col-span-2 font-mono text-xs opacity-40 uppercase">
							{s.date}
						</span>
						<span className="col-span-4 font-black uppercase tracking-tight text-sm">
							{s.model}
						</span>
						<span className="col-span-4 font-mono text-sm">
							{s.tokens.toLocaleString()}
							<span className="ml-2 opacity-40 text-xs">TOKENS</span>
						</span>
						<span className="col-span-2 font-mono text-xs text-right opacity-40">
							{s.duration}
						</span>
					</div>
				))}
			</div>

			{/* Footer */}
			<div className="grid grid-cols-2 mt-auto">
				<Link
					to="/leaderboards/daily"
					className="p-8 border-r border-foreground flex items-center justify-between hover:bg-primary transition-colors"
				>
					<span className="font-black text-lg uppercase tracking-tight">
						Leaderboard
					</span>
					<span className="font-mono">→</span>
				</Link>
				<div className="p-8 flex items-center justify-between hover:bg-primary transition-colors cursor-pointer border-t border-foreground md:border-t-0">
					<span className="font-black text-lg uppercase tracking-tight">
						Share Profile
					</span>
					<span className="font-mono text-xs opacity-40">
						token-quest.com/p/{QUESTER.handle}
					</span>
				</div>
			</div>
		</div>
	);
}
