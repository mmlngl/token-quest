import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@token-quest/ui/components/button";
import { T } from "@token-quest/ui/components/typography";

export const Route = createFileRoute("/_public/leaderboards/daily")({
	component: RouteComponent,
	loader: async () => {
		return {
			leaderboard: {
				masg: 4,
			},
		};
	},
	staleTime: 5000,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return (
		<div>
			<div className="flex gap-2">
				<Button asChild>
					<Link to="/leaderboards/daily">Daily</Link>
				</Button>
				<Button asChild variant="secondary">
					<Link to="/leaderboards/weekly">Weekly</Link>
				</Button>
			</div>

			<T.H1>Daily</T.H1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
