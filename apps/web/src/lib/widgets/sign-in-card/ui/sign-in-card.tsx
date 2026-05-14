import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@token-quest/ui/components/card";
import type { FC } from "react";
import { SignInButton } from "~lib/features/sign-in-button";

export const SignInCard: FC = () => {
	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle>Sign in</CardTitle>
				<CardDescription>Use GitHub to enter Token Quest.</CardDescription>
			</CardHeader>
			<CardContent>
				<SignInButton className="w-full" />
			</CardContent>
		</Card>
	);
};
