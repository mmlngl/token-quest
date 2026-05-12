import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: PublicHome });

function PublicHome() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			{/* Header strip */}
			<header className="bg-foreground text-background flex items-center justify-between px-8 py-4 border-b border-foreground">
				<span className="font-black text-sm tracking-widest uppercase">
					Play Token Quest · Free
				</span>
				<span className="font-mono text-xs tracking-widest uppercase">
					AI Usage · Ranked
				</span>
			</header>

			{/* Main grid */}
			<main className="flex-1 grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
				{/* Left — headline */}
				<div className="md:col-span-8 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-foreground">
					<h1 className="text-[15vw] md:text-[10vw] leading-[0.88] font-black tracking-tighter uppercase">
						Your
						<br />
						AI Usage.
						<br />
						<span className="text-primary">
							Now It
							<br />
							Counts.
						</span>
					</h1>

					<p className="font-mono text-sm md:text-base mt-12 pt-8 border-t border-foreground max-w-md leading-relaxed">
						You prompt, refine, and retry every day. That activity is invisible
						— no score, no streak, no status. Token Quest changes that.
					</p>
				</div>

				{/* Right — three pillars on primary green */}
				<div className="md:col-span-4 bg-primary flex flex-col">
					{[
						{
							n: "01",
							title: "Report\nSession",
							body: "Use AI normally.\nLog your tokens.",
						},
						{
							n: "02",
							title: "Climb\nLeaderboard",
							body: "Daily. Monthly.\nGlobally.",
						},
						{
							n: "03",
							title: "Earn\nBadges",
							body: "Milestones.\nStreaks. Status.",
						},
					].map(({ n, title, body }, i, arr) => (
						<div
							key={n}
							className={`p-8 flex-1 flex flex-col justify-between${i < arr.length - 1 ? " border-b border-foreground" : ""}`}
						>
							<span className="font-mono text-xs tracking-widest">{n}</span>
							<div>
								<h2 className="font-black text-2xl md:text-3xl uppercase leading-tight whitespace-pre-line mt-4">
									{title}
								</h2>
								<p className="font-mono text-xs mt-3 whitespace-pre-line leading-relaxed">
									{body}
								</p>
							</div>
						</div>
					))}
				</div>
			</main>

			{/* Footer nav */}
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
						Join Now
					</span>
					<span className="font-mono">→</span>
				</Link>
			</footer>
		</div>
	);
}
