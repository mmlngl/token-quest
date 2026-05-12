import * as Option from "effect/Option";
import { createContext, useContext } from "react";
import type * as Model from "../model";

export const BadgeContext = createContext<Option.Option<Model.BadgeModel>>(
	Option.none(),
);

export const useBadgeFromContext = (): Model.BadgeModel => {
	const opt = useContext(BadgeContext);
	return Option.getOrThrowWith(
		opt,
		() => new Error("useBadge must be used within a <BadgeEntity>"),
	);
};
