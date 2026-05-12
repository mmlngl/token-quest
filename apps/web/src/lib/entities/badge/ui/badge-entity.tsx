import * as Option from "effect/Option";
import type { FC, PropsWithChildren } from "react";
import type * as Model from "../model";
import { BadgeContext } from "./badge-context";

export const BadgeEntity: FC<PropsWithChildren<{ badge: Model.BadgeModel }>> = (
	props,
) => (
	<BadgeContext.Provider value={Option.some(props.badge)}>
		{props.children}
	</BadgeContext.Provider>
);
