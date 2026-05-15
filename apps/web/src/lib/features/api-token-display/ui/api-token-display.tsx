import type { ComponentProps, FC } from "react";
import type { ApiTokenModel } from "~lib/entities/api-token";

export type ApiTokenDisplayProps = ComponentProps<"div"> & {
	token: ApiTokenModel;
};

export const ApiTokenDisplay: FC<ApiTokenDisplayProps> = ({
	token,
	...props
}) => {
	return <div {...props}>{token}</div>;
};
