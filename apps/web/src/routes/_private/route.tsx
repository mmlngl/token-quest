import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import * as Auth from "~lib/services/auth/auth.functions";
import { AppMasthead } from "~lib/widgets/app-masthead";

export const Route = createFileRoute("/_private")({
	component: PrivateLayout,
	beforeLoad: async () => {
		const session = await Auth.getSession();
		if (!session) throw redirect({ to: "/sign-in/$" });
		return { user: session.user };
	},
});

function PrivateLayout() {
	return (
		<div className="mx-5 my-10 md:my-20">
			<div className="container mx-auto max-w-3xl">
				<AppMasthead />
				<Outlet />
			</div>
		</div>
	);
}
