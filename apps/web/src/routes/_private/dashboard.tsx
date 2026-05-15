import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@token-quest/ui/components/card";
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
					<CardTitle>Leaderboards</CardTitle>
				</CardHeader>
				<CardContent>Content here</CardContent>
				<CardFooter>Footer content here</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>API Token</CardTitle>
				</CardHeader>
				<CardContent>
					<ApiTokenDisplay token={token} />
				</CardContent>
				<CardFooter>Footer content here</CardFooter>
			</Card>
		</div>
	);
}
