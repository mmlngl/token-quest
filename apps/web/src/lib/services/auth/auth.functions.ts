import { auth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const authStateFn = createServerFn().handler(async () => {
	const { isAuthenticated, userId } = await auth();

	if (!isAuthenticated) {
		throw redirect({
			to: "/auth",
		});
	}

	return { userId };
});
