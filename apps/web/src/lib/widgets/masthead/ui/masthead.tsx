import { Link } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@token-quest/ui/components/navigation-menu";
import type { FC, ReactNode } from "react";

export interface MastheadProps {
	pageTitle: ReactNode;
}

export const Masthead: FC<MastheadProps> = ({ pageTitle }) => {
	return (
		<header className="bg-foreground text-background flex items-center justify-between px-8 py-4 border-b border-foreground">
			<div className="flex items-center gap-8">
				<Link
					to="/"
					className="font-mono text-xs tracking-widest uppercase opacity-60 hover:opacity-100"
				>
					← Token Quest
				</Link>
				<span className="font-black text-sm tracking-widest uppercase">
					{pageTitle}
				</span>
			</div>
			<div className="flex items-center gap-8">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Leaderboards</NavigationMenuTrigger>
							<NavigationMenuContent>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link to="/leaderboards/daily">Daily</Link>
								</NavigationMenuLink>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link to="/leaderboards/weekly">Weekly</Link>
								</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<Link
					to="/guide"
					className="font-mono text-xs tracking-widest uppercase opacity-60 hover:opacity-100"
				>
					How to Play
				</Link>
				<span className="font-mono text-xs opacity-40">Sun 10 May 2026</span>
			</div>
		</header>
	);
};
