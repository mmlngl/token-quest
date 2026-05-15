import { Button } from "@token-quest/ui/components/button";
import { toast } from "@token-quest/ui/components/sonner";
import { cn } from "@token-quest/ui/lib/utils";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { type ComponentProps, type FC, useCallback, useState } from "react";
import type { ApiTokenModel } from "~lib/entities/api-token";

export type ApiTokenDisplayProps = ComponentProps<"div"> & {
	token: ApiTokenModel;
	showMaskToggle?: boolean;
};

export const ApiTokenDisplay: FC<ApiTokenDisplayProps> = ({
	token,
	showMaskToggle = true,
	className,
	...props
}) => {
	const [copied, setCopied] = useState(false);
	const [masked, setMasked] = useState(true);

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(token);
			setCopied(true);
			toast.success("Token copied to clipboard");
			setTimeout(() => setCopied(false), 2000);
		} catch (_err) {
			toast.error("Failed to copy token");
		}
	}, [token]);

	const toggleMask = useCallback(() => {
		setMasked((prev) => !prev);
	}, []);

	const displayToken = masked
		? `${token.slice(0, 8)}${"•".repeat(Math.max(token.length - 12, 8))}${token.slice(-4)}`
		: token;

	return (
		<div
			className={cn(
				"flex items-center gap-2 rounded-sm border border-input bg-input/30 px-3 py-2 shadow-xs",
				className,
			)}
			{...props}
		>
			<code className="font-mono text-sm flex-1 select-all break-all">
				{displayToken}
			</code>
			<div className="flex items-center gap-1 shrink-0">
				{showMaskToggle && (
					<Button
						size="icon"
						variant="ghost"
						onClick={toggleMask}
						className="size-8"
						title={masked ? "Show token" : "Hide token"}
					>
						{masked ? <Eye /> : <EyeOff />}
					</Button>
				)}
				<Button
					size="icon"
					variant="ghost"
					onClick={handleCopy}
					className="size-8"
					title="Copy token"
				>
					{copied ? <Check className="bg-primary" /> : <Copy />}
				</Button>
			</div>
		</div>
	);
};
