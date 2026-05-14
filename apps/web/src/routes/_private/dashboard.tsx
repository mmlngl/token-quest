import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@token-quest/ui/components/card";
import { ApiTokenDisplay } from "~features/api-token-display";

export const Route = createFileRoute("/_private/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4 md:gap-14">
			<Card>
				<CardHeader>
					<CardTitle>API Token</CardTitle>
				</CardHeader>
				<CardContent>
					<ApiTokenDisplay />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Leaderboards</CardTitle>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Profile</CardTitle>
				</CardHeader>
			</Card>
		</div>
	);
}
