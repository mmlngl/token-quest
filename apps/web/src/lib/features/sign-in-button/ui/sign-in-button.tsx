import { Button } from "@token-quest/ui/components/button";
import { Loader2 } from "lucide-react";
import { type ComponentProps, type FC, useCallback, useState } from "react";
import { authClient } from "~lib/services/auth/auth-client";

export const SignInButton: FC<ComponentProps<"button">> = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const handleClick = useCallback(async () => {
		setIsLoading(true);
		await authClient.signIn.social({
			provider: "github",
			callbackURL: "/dashboard",
		});
	}, []);
	return (
		<Button {...props} disabled={isLoading} onClick={handleClick}>
			{isLoading ? <Loader2 className="animate-spin" /> : null}
			<span>Sign in with Github</span>
		</Button>
	);
};
