import { Link, useLoaderData } from "@tanstack/react-router";
import { Button } from "@token-quest/ui/components/button";
import type { FC } from "react";

export const AppMasthead: FC = () => {
	const {
		user: { name },
	} = useLoaderData({ from: "/_private" });
	return (
		<div className="mb-10 flex items-center justify-between">
			<Link to="/p/$questerHandle" params={{ questerHandle: name }}>
				@{name}
			</Link>
			<div className="flex gap-2">
				<Button variant="link" asChild>
					<Link to="/dashboard">Dashboard</Link>
				</Button>
				<Button variant="link" asChild>
					<Link to="/settings">Settings</Link>
				</Button>
			</div>
		</div>
	);
};
