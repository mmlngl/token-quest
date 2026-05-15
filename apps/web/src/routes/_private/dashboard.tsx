import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@token-quest/ui/components/card";
import { T } from "@token-quest/ui/components/typography";
import type { ApiTokenModel } from "~lib/entities/api-token";
import { ApiTokenDisplay } from "~lib/features/api-token-display";

export const Route = createFileRoute("/_private/dashboard")({
	component: DashboardView,
	loader: async () => {
		return {
			token: "abcdef2" as ApiTokenModel,
		};
	},
});

function DashboardView() {
	const { token } = Route.useLoaderData();
	return (
		<div className="flex flex-col gap-4 md:gap-14">
			<Card>
				<CardHeader>
					<CardTitle>
						<T.H3>Leaderboards</T.H3>
					</CardTitle>
				</CardHeader>
				<CardContent>Content here</CardContent>
				<CardFooter>Footer content here</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>
						<T.H3>API Token</T.H3>
					</CardTitle>
					<CardDescription>
						Use this token when reporting your Session Stats.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ApiTokenDisplay token={token} />
				</CardContent>
				<CardFooter>
					<T.Small>
						Need help getting set-up? <Link to="/guide">Follow the guide</Link>.
					</T.Small>
				</CardFooter>
			</Card>
		</div>
	);
}
