import { createFileRoute, Link } from "@tanstack/react-router";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@token-quest/ui/components/chart";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import * as Masthead from "~widgets/masthead";
import * as UnderConstruction from "~widgets/under-constructions";

export const Route = createFileRoute("/leaderboards/daily")({
	component: DailyLeaderboard,
	staleTime: 30_000,
});

const PODIUM = [
	{ rank: 1, handle: "voxelmancer", tokens: 847_231, streak: 12, sessions: 34 },
	{ rank: 2, handle: "null_prophet", tokens: 612_445, streak: 7, sessions: 21 },
	{ rank: 3, handle: "fork_wizard", tokens: 589_112, streak: 21, sessions: 29 },
];

const REST = [
	{ rank: 4, handle: "terminal_ghost", tokens: 423_876, streak: 4 },
	{ rank: 5, handle: "sudo_sensei", tokens: 387_654, streak: 9 },
	{ rank: 6, handle: "bytewhisperer", tokens: 341_209, streak: 3 },
	{ rank: 7, handle: "promptsmith", tokens: 298_543, streak: 14 },
	{ rank: 8, handle: "recursion_fairy", tokens: 247_891, streak: 2 },
	{ rank: 9, handle: "hallucinator", tokens: 198_432, streak: 6 },
	{ rank: 10, handle: "context_window", tokens: 167_543, streak: 1 },
];

const HOURLY = [
	{ h: "06", t: 12_400 },
	{ h: "07", t: 34_500 },
	{ h: "08", t: 67_800 },
	{ h: "09", t: 145_600 },
	{ h: "10", t: 198_400 },
	{ h: "11", t: 234_100 },
	{ h: "12", t: 189_300 },
	{ h: "13", t: 156_700 },
	{ h: "14", t: 287_400 },
	{ h: "15", t: 312_900 },
	{ h: "16", t: 298_700 },
	{ h: "17", t: 267_300 },
	{ h: "18", t: 198_400 },
	{ h: "19", t: 234_600 },
	{ h: "20", t: 267_800 },
	{ h: "21", t: 312_400 },
	{ h: "22", t: 287_600 },
	{ h: "23", t: 198_300 },
];

const chartConfig = {
	t: { label: "Tokens", color: "oklch(0.7386 0.2787 143.47)" },
} satisfies ChartConfig;

const fmt = (n: number) => n.toLocaleString();

function DailyLeaderboard() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			<UnderConstruction.UnderConstruction />
			{/* Header */}
			<Masthead.Masthead pageTitle="Daily Leaderboard" />

			{/* Podium — top 3 */}
			<div className="grid grid-cols-1 md:grid-cols-3 border-b border-foreground">
				{/* 1st — green */}
				<div className="bg-primary border-b md:border-b-0 md:border-r border-foreground p-8 flex flex-col justify-between min-h-64">
					<div className="flex items-start justify-between">
						<span className="font-mono text-xs tracking-widest">TODAY</span>
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
								{PODIUM[0].sessions} sessions today
							</div>
						</div>
					</div>
				</div>

				{/* 2nd */}
				<div className="border-b md:border-b-0 md:border-r border-foreground p-8 flex flex-col justify-between min-h-64">
					<div className="flex items-start justify-between">
						<span className="font-mono text-xs tracking-widest opacity-40">
							TODAY
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
								{PODIUM[1].sessions} sessions today
							</div>
						</div>
					</div>
				</div>

				{/* 3rd */}
				<div className="p-8 flex flex-col justify-between min-h-64">
					<div className="flex items-start justify-between">
						<span className="font-mono text-xs tracking-widest opacity-40">
							TODAY
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
								{PODIUM[2].sessions} sessions today
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Chart + Stats */}
			<div className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
				{/* Chart */}
				<div className="md:col-span-8 p-8 border-b md:border-b-0 md:border-r border-foreground">
					<div className="flex items-baseline justify-between mb-6">
						<span className="font-black text-sm uppercase tracking-widest">
							Community Activity
						</span>
						<span className="font-mono text-xs opacity-40">
							Hourly tokens · today
						</span>
					</div>
					<ChartContainer config={chartConfig} className="h-48 w-full">
						<BarChart data={HOURLY} barCategoryGap="20%">
							<XAxis
								dataKey="h"
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
							<ChartTooltip
								content={<ChartTooltipContent />}
								cursor={{ fill: "oklch(0 0 0 / 0.05)" }}
							/>
							<Bar dataKey="t" radius={0}>
								{HOURLY.map((entry, i) => (
									<Cell
										key={entry.h}
										fill={
											entry.t >= 300_000
												? "oklch(0.7386 0.2787 143.47)"
												: i % 2 === 0
													? "oklch(0 0 0)"
													: "oklch(0 0 0 / 0.6)"
										}
									/>
								))}
							</Bar>
						</BarChart>
					</ChartContainer>
					<p className="font-mono text-xs opacity-40 mt-4">
						↑ Peak hours highlighted in green. Are you part of the late-night
						grind?
					</p>
				</div>

				{/* Stats */}
				<div className="md:col-span-4 bg-primary flex flex-col">
					{[
						{ label: "Sessions Today", value: "1,247" },
						{ label: "Total Tokens Today", value: "4.3M" },
						{ label: "Top Model", value: "Sonnet 4" },
						{ label: "Top Provider", value: "Anthropic" },
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

			{/* Ranks 4–10 */}
			<div className="flex-1">
				{REST.map((p, i) => (
					<div
						key={p.handle}
						className={`grid grid-cols-12 items-center px-8 py-4 hover:bg-primary transition-colors${i < REST.length - 1 ? " border-b border-foreground" : ""}`}
					>
						<span className="col-span-1 font-mono text-xs opacity-40">
							{String(p.rank).padStart(2, "0")}
						</span>
						<span className="col-span-5 font-black uppercase tracking-tight">
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
				<div className="p-8 border-r border-foreground flex items-center justify-between hover:bg-primary transition-colors cursor-pointer">
					<span className="font-black text-lg uppercase tracking-tight">
						Your rank: —
					</span>
					<span className="font-mono text-xs opacity-40">
						Sign in to compete
					</span>
				</div>
				<Link
					to="/sign-in/$"
					params={{ _splat: "" }}
					className="p-8 flex items-center justify-between hover:bg-primary transition-colors bg-foreground text-background"
				>
					<span className="font-black text-lg uppercase tracking-tight">
						Join the battle
					</span>
					<span className="font-mono">→</span>
				</Link>
			</div>
		</div>
	);
}
