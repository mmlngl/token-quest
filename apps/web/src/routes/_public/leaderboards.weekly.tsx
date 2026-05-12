import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@token-quest/ui/components/button";
import { T } from "@token-quest/ui/components/typography";

export const Route = createFileRoute("/_public/leaderboards/weekly")({
	component: RouteComponent,
	loader: async () => {
		return {
			leaderboard: {
				msg: 2,
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
				<Button asChild>
					<Link to="/leaderboards/weekly">Weekly</Link>
				</Button>
			</div>

			<T.H1>Weekly</T.H1>

			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
