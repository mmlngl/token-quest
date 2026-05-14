import type { FC } from "react";

export const AppMasthead: FC = () => {
	return (
		<div className="mb-10 flex items-center justify-between">
			<span>@mnlngl</span>
			<div className="flex gap-2">Settings</div>
		</div>
	);
};
