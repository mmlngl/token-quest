import { createFileRoute } from "@tanstack/react-router";
import { T } from "@token-quest/ui/components/typography";

export const Route = createFileRoute("/guide")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<T.H1>How to Play Token Quest</T.H1>
		</div>
	);
}
