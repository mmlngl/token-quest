import { createFileRoute } from "@tanstack/react-router";
import { SignInCard } from "~lib/widgets/sign-in-card";

export const Route = createFileRoute("/sign-in/$")({
	component: SignInPage,
});

function SignInPage() {
	return (
		<div className="h-screen bg-primary/20 flex items-center justify-center">
			<SignInCard />
		</div>
	);
}
