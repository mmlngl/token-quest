import { createFileRoute } from "@tanstack/react-router";
import { T } from "@token-quest/ui/components/typography";
import * as Masthead from "~widgets/masthead";

export const Route = createFileRoute("/guide")({
	component: GuidePage,
});

function GuidePage() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			<Masthead.Masthead pageTitle="Guide" />
			<T.H1>How to Play Token Quest</T.H1>
		</div>
	);
}
