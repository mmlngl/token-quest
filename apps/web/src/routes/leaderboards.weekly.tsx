import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setResponseHeaders } from "@tanstack/react-start/server";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@token-quest/ui/components/chart";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import * as Runtime from "~services/runtime";
import * as Masthead from "~widgets/masthead";
import * as UnderConstruction from "~widgets/under-constructions";

export const getData = createServerFn().handler(async () => {
	setResponseHeaders(
		new Headers({
			"Cache-Control": "public, max-age=300",
			"CDN-Cache-Control": "max-age=3600, stale-while-revalidate=600",
		}),
	);

	const program = Effect.gen(function* () {
		return yield* Effect.void;
	});

	const exit = await Runtime.Runtime.runtime.runPromiseExit(program);
	return Exit.match(exit, {
		onSuccess: () => void 0,
		onFailure: (cause) => {
			throw new Error(`Failed to requester\n${Cause.pretty(cause)}`);
		},
	});
});

export const Route = createFileRoute("/leaderboards/weekly")({
	component: WeeklyLeaderboard,
	loader: () => getData(),
	staleTime: 30_000,
});

const PODIUM = [
	{
		rank: 1,
		handle: "recursion_fairy",
		tokens: 4_231_876,
		streak: 21,
		sessions: 187,
		delta: "+2",
	},
	{
		rank: 2,
		handle: "voxelmancer",
		tokens: 3_987_441,
		streak: 12,
		sessions: 203,
		delta: "—",
	},
	{
		rank: 3,
		handle: "context_window",
		tokens: 3_412_009,
		streak: 8,
		sessions: 154,
		delta: "+1",
	},
];

const REST = [
	{
		rank: 4,
		handle: "null_prophet",
		tokens: 2_987_654,
		streak: 7,
		delta: "-1",
	},
	{
		rank: 5,
		handle: "fork_wizard",
		tokens: 2_734_212,
		streak: 21,
		delta: "-2",
	},
	{ rank: 6, handle: "sudo_sensei", tokens: 2_198_765, streak: 9, delta: "+3" },
	{
		rank: 7,
		handle: "bytewhisperer",
		tokens: 1_987_432,
		streak: 3,
		delta: "—",
	},
	{
		rank: 8,
		handle: "terminal_ghost",
		tokens: 1_654_321,
		streak: 4,
		delta: "+1",
	},
	{
		rank: 9,
		handle: "promptsmith",
		tokens: 1_298_543,
		streak: 14,
		delta: "-2",
	},
	{ rank: 10, handle: "hallucinator", tokens: 987_654, streak: 6, delta: "—" },
];

// Top 3 cumulative tokens over Mon–Sun — a tense race narrative
const RACE = [
	{ day: "Mon", r1: 312_000, r2: 687_000, r3: 198_000 },
	{ day: "Tue", r1: 789_000, r2: 1_234_000, r3: 567_000 },
	{ day: "Wed", r1: 1_456_000, r2: 1_876_000, r3: 1_098_000 },
	{ day: "Thu", r1: 2_234_000, r2: 2_398_000, r3: 1_743_000 },
	{ day: "Fri", r1: 2_987_000, r2: 2_901_000, r3: 2_312_000 },
	{ day: "Sat", r1: 3_654_000, r2: 3_345_000, r3: 2_876_000 },
	{ day: "Sun", r1: 4_231_876, r2: 3_987_441, r3: 3_412_009 },
];

const chartConfig = {
	r1: { label: "recursion_fairy", color: "oklch(0.7386 0.2787 143.47)" },
	r2: { label: "voxelmancer", color: "oklch(0 0 0)" },
	r3: { label: "context_window", color: "oklch(0.6 0 0)" },
} satisfies ChartConfig;

const fmt = (n: number) =>
	n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n.toLocaleString();

const deltaColor = (d: string) =>
	d.startsWith("+")
		? "text-primary"
		: d === "—"
			? "opacity-30"
			: "text-destructive";

function WeeklyLeaderboard() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			<UnderConstruction.UnderConstruction />
			{/* Header */}
			<Masthead.Masthead pageTitle="Weekly Leaderboard" />

			{/* Podium — top 3 */}
			<div className="grid grid-cols-1 md:grid-cols-3 border-b border-foreground">
				{/* 1st */}
				<div className="bg-primary border-b md:border-b-0 md:border-r border-foreground p-8 flex flex-col justify-between min-h-64">
					<div className="flex items-start justify-between">
						<span className="font-mono text-xs tracking-widest">THIS WEEK</span>
						<span className="font-mono text-xs border border-foreground px-2 py-1">
							🔥 {PODIUM[0].streak} DAY STREAK
						</span>
					</div>
					<div>
						<div className="text-[8rem] leading-none font-black tracking-tighter opacity-10 select-none">
							01
						</div>
						<div className="-mt-8">
							<div className="font-black text-4xl uppercase tracking-tight">
								{PODIUM[0].handle}
							</div>
							<div className="font-mono text-2xl mt-1">
								{fmt(PODIUM[0].tokens)}
								<span className="text-sm ml-2 opacity-60">TOKENS</span>
							</div>
							<div className="font-mono text-xs mt-2 opacity-60">
								{PODIUM[0].sessions} sessions · overtook #1 on Friday
							</div>
						</div>
					</div>
				</div>

				{/* 2nd */}
				<div className="border-b md:border-b-0 md:border-r border-foreground p-8 flex flex-col justify-between min-h-64">
					<div className="flex items-start justify-between">
						<span className="font-mono text-xs tracking-widest opacity-40">
							THIS WEEK
						</span>
						<span className="font-mono text-xs border border-foreground px-2 py-1">
							⚡ {PODIUM[1].streak} DAY STREAK
						</span>
					</div>
					<div>
						<div className="text-[8rem] leading-none font-black tracking-tighter opacity-10 select-none">
							02
						</div>
						<div className="-mt-8">
							<div className="font-black text-3xl uppercase tracking-tight">
								{PODIUM[1].handle}
							</div>
							<div className="font-mono text-xl mt-1">
								{fmt(PODIUM[1].tokens)}
								<span className="text-sm ml-2 opacity-60">TOKENS</span>
							</div>
							<div className="font-mono text-xs mt-2 opacity-60">
								{PODIUM[1].sessions} sessions · led until day 5
							</div>
						</div>
					</div>
				</div>

				{/* 3rd */}
				<div className="p-8 flex flex-col justify-between min-h-64">
					<div className="flex items-start justify-between">
						<span className="font-mono text-xs tracking-widest opacity-40">
							THIS WEEK
						</span>
						<span className="font-mono text-xs border border-foreground px-2 py-1">
							🧙 {PODIUM[2].streak} DAY STREAK
						</span>
					</div>
					<div>
						<div className="text-[8rem] leading-none font-black tracking-tighter opacity-10 select-none">
							03
						</div>
						<div className="-mt-8">
							<div className="font-black text-2xl uppercase tracking-tight">
								{PODIUM[2].handle}
							</div>
							<div className="font-mono text-lg mt-1">
								{fmt(PODIUM[2].tokens)}
								<span className="text-sm ml-2 opacity-60">TOKENS</span>
							</div>
							<div className="font-mono text-xs mt-2 opacity-60">
								{PODIUM[2].sessions} sessions · climbing fast
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Race chart + stats */}
			<div className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
				{/* Line chart — the race */}
				<div className="md:col-span-8 p-8 border-b md:border-b-0 md:border-r border-foreground">
					<div className="flex items-baseline justify-between mb-6">
						<span className="font-black text-sm uppercase tracking-widest">
							The Race
						</span>
						<span className="font-mono text-xs opacity-40">
							Cumulative tokens · top 3
						</span>
					</div>
					<ChartContainer config={chartConfig} className="h-52 w-full">
						<LineChart data={RACE}>
							<XAxis
								dataKey="day"
								axisLine={false}
								tickLine={false}
								tick={{
									fontSize: 10,
									fontFamily: "var(--font-mono)",
									fill: "currentColor",
									opacity: 0.4,
								}}
							/>
							<YAxis hide />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Line
								dataKey="r1"
								stroke="oklch(0.7386 0.2787 143.47)"
								strokeWidth={3}
								dot={false}
							/>
							<Line
								dataKey="r2"
								stroke="oklch(0 0 0)"
								strokeWidth={2}
								dot={false}
								strokeDasharray="6 3"
							/>
							<Line
								dataKey="r3"
								stroke="oklch(0.55 0 0)"
								strokeWidth={1.5}
								dot={false}
								strokeDasharray="2 4"
							/>
						</LineChart>
					</ChartContainer>
					<div className="flex gap-6 mt-4 font-mono text-xs opacity-60">
						<span className="flex items-center gap-2">
							<span className="inline-block w-4 h-0.5 bg-primary" />{" "}
							recursion_fairy
						</span>
						<span className="flex items-center gap-2">
							<span className="inline-block w-4 h-0.5 bg-foreground" />{" "}
							voxelmancer
						</span>
						<span className="flex items-center gap-2">
							<span className="inline-block w-4 h-0.5 bg-muted-foreground" />{" "}
							context_window
						</span>
					</div>
					<p className="font-mono text-xs opacity-40 mt-3">
						↑ recursion_fairy overtook the lead on Friday. 244K tokens separate
						1st and 2nd.
					</p>
				</div>

				{/* Stats */}
				<div className="md:col-span-4 bg-primary flex flex-col">
					{[
						{ label: "Sessions This Week", value: "8,743" },
						{ label: "Total Tokens", value: "31.2M" },
						{ label: "Active Players", value: "312" },
						{ label: "Biggest Single Day", value: "Fri · 6.1M" },
					].map(({ label, value }, i, arr) => (
						<div
							key={label}
							className={`p-6 flex flex-col justify-between flex-1${i < arr.length - 1 ? " border-b border-foreground" : ""}`}
						>
							<span className="font-mono text-xs tracking-widest uppercase opacity-60">
								{label}
							</span>
							<span className="font-black text-2xl uppercase tracking-tight mt-2">
								{value}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Ranks 4–10 with delta */}
			<div className="flex-1">
				{REST.map((p, i) => (
					<div
						key={p.handle}
						className={`grid grid-cols-12 items-center px-8 py-4 hover:bg-primary transition-colors${i < REST.length - 1 ? " border-b border-foreground" : ""}`}
					>
						<span className="col-span-1 font-mono text-xs opacity-40">
							{String(p.rank).padStart(2, "0")}
						</span>
						<span
							className={`col-span-1 font-mono text-xs font-bold text-center ${deltaColor(p.delta)}`}
						>
							{p.delta}
						</span>
						<span className="col-span-4 font-black uppercase tracking-tight">
							{p.handle}
						</span>
						<span className="col-span-4 font-mono text-sm">
							{fmt(p.tokens)}
							<span className="ml-2 opacity-40 text-xs">TOKENS</span>
						</span>
						<span className="col-span-2 font-mono text-xs text-right opacity-60">
							{p.streak}d streak
						</span>
					</div>
				))}
			</div>

			{/* Footer CTA */}
			<div className="grid grid-cols-2 border-t border-foreground">
				<div className="p-8 border-r border-foreground flex items-center justify-between">
					<div>
						<div className="font-mono text-xs opacity-40 uppercase tracking-widest">
							Week ends in
						</div>
						<div className="font-black text-lg uppercase tracking-tight mt-1">
							18h 43m
						</div>
					</div>
					<span className="font-mono text-xs opacity-40">
						Can you crack top 10?
					</span>
				</div>
				<Link
					to="/sign-in/$"
					params={{ _splat: "" }}
					className="p-8 flex items-center justify-between hover:bg-primary transition-colors bg-foreground text-background"
				>
					<span className="font-black text-lg uppercase tracking-tight">
						Start competing
					</span>
					<span className="font-mono">→</span>
				</Link>
			</div>
		</div>
	);
}
