import { ClerkProvider } from "@clerk/clerk-react";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
	throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local");
}

export default function AppClerkProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
			{children}
		</ClerkProvider>
	);
}
