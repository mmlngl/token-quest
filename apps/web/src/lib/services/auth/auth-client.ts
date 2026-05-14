import { apiKeyClient } from "@better-auth/api-key/client";
import { createClientOnlyFn } from "@tanstack/react-start";
import { createAuthClient } from "better-auth/client";

export const authClient = createClientOnlyFn(() =>
	createAuthClient({
		plugins: [apiKeyClient()],
	}),
);
