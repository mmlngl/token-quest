import { createFileRoute, Link } from "@tanstack/react-router";
import * as Masthead from "~widgets/masthead";

export const Route = createFileRoute("/develop")({
	component: DevelopPage,
});

function DevelopPage() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			<Masthead.Masthead pageTitle="Develop" />

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
