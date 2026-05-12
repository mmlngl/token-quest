import type { FC } from "react";
import * as Entity from "~entities/badge";

export interface BadgeProps {
	badge: Entity.BadgeModel;
}

export const BadgeWidget: FC<BadgeProps> = ({ badge }) => (
	<Entity.BadgeEntity badge={badge}>
		<div className="border border-dashed border-foreground/30 flex flex-col p-4 opacity-40 select-none aspect-square justify-between">
			<span className="font-mono text-xs tracking-widest opacity-50">
				LOCKED
			</span>
			<div>
				<div className={`font-black text-2xl opacity-20`}>{badge.emoji}</div>
				<div
					className={`font-black uppercase tracking-tight mt-2 text-xs leading-tight`}
				>
					{badge.name}
				</div>
			</div>
			<p>{badge.description}</p>
			<span className="font-mono text-xs opacity-40 uppercase tracking-widest">
				RARE
			</span>
		</div>
	</Entity.BadgeEntity>
);
