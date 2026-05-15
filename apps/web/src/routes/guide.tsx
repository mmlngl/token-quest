import { createFileRoute, Link } from "@tanstack/react-router";
import * as Masthead from "~widgets/masthead";
import * as UnderConstruction from "~widgets/under-constructions";

export const Route = createFileRoute("/guide")({
	component: GuidePage,
});

function GuidePage() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			<UnderConstruction.UnderConstruction />
			<Masthead.Masthead pageTitle="How to Play" />
			{/* Hero */}
			<section className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
				{/* Left — headline */}
				<div className="md:col-span-7 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-foreground">
					<span className="font-mono text-xs tracking-widest uppercase opacity-50">
						The Game
					</span>
					<h1 className="text-[12vw] md:text-[8vw] leading-[0.88] font-black tracking-tighter uppercase mt-8">
						Use AI.
						<br />
						Get
						<br />
						<span className="text-primary">Ranked.</span>
					</h1>
					<p className="font-mono text-sm mt-12 pt-8 border-t border-foreground max-w-md leading-relaxed">
						Token Quest turns your existing AI activity into a social game. No
						new habits. No extra tools. Just your sessions, scored.
					</p>
				</div>

				{/* Right — the loop */}
				<div className="md:col-span-5 flex flex-col">
					{[
						{
							n: "01",
							title: "Use AI\nNormally",
							body: "Prompt, refine, retry.\nAnything counts.",
						},
						{
							n: "02",
							title: "Report\nYour Session",
							body: "CLI, extension,\nor direct API.",
						},
						{
							n: "03",
							title: "Score\nUpdates",
							body: "Leaderboards move.\nBadges unlock.",
						},
						{
							n: "04",
							title: "Come Back\nTomorrow",
							body: "Streaks compound.\nRanks shift daily.",
						},
					].map(({ n, title, body }, i, arr) => (
						<div
							key={n}
							className={`p-8 flex-1 flex flex-col justify-between${i < arr.length - 1 ? " border-b border-foreground" : ""}`}
						>
							<span className="font-mono text-xs tracking-widest opacity-50">
								{n}
							</span>
							<div>
								<h2 className="font-black text-2xl uppercase leading-tight whitespace-pre-line mt-4">
									{title}
								</h2>
								<p className="font-mono text-xs mt-3 whitespace-pre-line leading-relaxed opacity-70">
									{body}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>
			{/* Scoring */}
			<section className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
				<div className="md:col-span-4 bg-foreground text-background p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-foreground">
					<span className="font-mono text-xs tracking-widest uppercase opacity-50">
						Scoring
					</span>
					<h2 className="font-black text-4xl md:text-5xl uppercase leading-tight mt-8">
						Not Just
						<br />
						Who Spent
						<br />
						Most.
					</h2>
				</div>
				<div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3">
					{[
						{ label: "Total Tokens", desc: "Raw usage across all sessions" },
						{ label: "Active Days", desc: "Consistency over time" },
						{ label: "Streak", desc: "Consecutive days with sessions" },
						{ label: "Sessions", desc: "Frequency of engagement" },
						{ label: "Model Range", desc: "Diversity across providers" },
						{ label: "Challenges", desc: "Constraint completions" },
					].map(({ label, desc }, i) => (
						<div
							key={label}
							className={`p-6 flex flex-col justify-between border-foreground${i % 3 !== 2 ? " border-r" : ""}${i < 3 ? " border-b" : ""}`}
						>
							<span className="font-black text-sm uppercase leading-tight">
								{label}
							</span>
							<p className="font-mono text-xs mt-4 leading-relaxed opacity-60">
								{desc}
							</p>
						</div>
					))}
				</div>
			</section>
			{/* Badges */}
			<section className="border-b border-foreground">
				<div className="grid grid-cols-1 md:grid-cols-12">
					<div className="md:col-span-12 p-8 border-b border-foreground flex items-baseline justify-between">
						<h2 className="font-black text-3xl uppercase tracking-tight">
							Badge Families
						</h2>
						<span className="font-mono text-xs tracking-widest uppercase opacity-50">
							Collect them all
						</span>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4">
					{[
						{
							family: "Milestone",
							emoji: "🏔",
							examples: [
								"First Step",
								"10K Tokens",
								"100K Tokens",
								"1M Tokens",
							],
						},
						{
							family: "Consistency",
							emoji: "🔥",
							examples: ["3-Day Streak", "7-Day Streak", "30-Day Streak"],
						},
						{
							family: "Competitive",
							emoji: "🏆",
							examples: ["Top 100 Today", "Top 10 Today", "Monthly Podium"],
						},
						{
							family: "Exploration",
							emoji: "🧭",
							examples: ["Multi-Model", "Multi-Provider", "Weekend Warrior"],
						},
					].map(({ family, emoji, examples }, i, arr) => (
						<div
							key={family}
							className={`p-8 flex flex-col gap-6${i < arr.length - 1 ? " border-b md:border-b-0 md:border-r border-foreground" : ""}`}
						>
							<div className="flex items-start justify-between">
								<h3 className="font-black text-xl uppercase">{family}</h3>
								<span className="text-2xl">{emoji}</span>
							</div>
							<ul className="flex flex-col gap-2">
								{examples.map((ex) => (
									<li
										key={ex}
										className="font-mono text-xs tracking-wide opacity-60 border-l-2 border-foreground/20 pl-3"
									>
										{ex}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>
			{/* Reporting */}
			<section className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
				<div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-foreground">
					<span className="font-mono text-xs tracking-widest uppercase opacity-50">
						Reporting
					</span>
					<div>
						<h2 className="font-black text-4xl md:text-5xl uppercase leading-tight mt-8">
							Automatic
							<br />
							or Manual.
							<br />
							<span className="text-primary">Your Call.</span>
						</h2>
						<p className="font-mono text-sm mt-8 leading-relaxed opacity-70 max-w-sm">
							Use an integration and reporting is invisible. Or report sessions
							manually in seconds. Either way, your score updates.
						</p>
					</div>
				</div>
				<div className="md:col-span-7 flex flex-col">
					{[
						{
							method: "CLI",
							tag: "Recommended",
							desc: "Report any session from the terminal. Works with any AI tool.",
							code: "tq report --tokens 4200 --model gpt-4o",
						},
						{
							method: "Extension",
							tag: "Automatic",
							desc: "Install the browser or editor extension and usage reports itself.",
							code: null,
						},
						{
							method: "API",
							tag: "For Builders",
							desc: "POST to the reporting endpoint directly. Integrate with any harness or script.",
							code: "POST /api/sessions",
						},
					].map(({ method, tag, desc, code }, i, arr) => (
						<div
							key={method}
							className={`p-8 flex flex-col gap-4${i < arr.length - 1 ? " border-b border-foreground" : ""}`}
						>
							<div className="flex items-center gap-4">
								<h3 className="font-black text-lg uppercase">{method}</h3>
								<span className="font-mono text-xs tracking-widest uppercase bg-primary px-2 py-0.5">
									{tag}
								</span>
							</div>
							<p className="font-mono text-xs leading-relaxed opacity-60 max-w-md">
								{desc}
							</p>
							{code && (
								<code className="font-mono text-xs bg-foreground text-background px-3 py-2 self-start">
									{code}
								</code>
							)}
						</div>
					))}
				</div>
			</section>
			{/* Footer CTA */}
			<footer className="grid grid-cols-1 md:grid-cols-2">
				<Link
					to="/leaderboards/daily"
					className="p-8 group border-r border-foreground flex items-center justify-between hover:bg-primary transition-colors"
				>
					<span className="font-black text-lg uppercase group-hover:underline tracking-tight">
						View Leaderboard
					</span>
					<span className="font-mono">→</span>
				</Link>
				<Link
					to="/sign-in/$"
					params={{ _splat: "" }}
					className="p-8 group flex items-center justify-between hover:bg-primary transition-colors border-t md:border-t-0 border-foreground"
				>
					<span className="font-black text-lg uppercase group-hover:underline tracking-tight">
						Start Playing
					</span>
					<span className="font-mono">→</span>
				</Link>
			</footer>
		</div>
	);
}
