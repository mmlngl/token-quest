import { createFileRoute, Link } from "@tanstack/react-router";

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
			<Link to="/leaderboards/daily">Daily</Link>
			<Link to="/leaderboards/weekly">Weekly</Link>
			<h1>Daily</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
