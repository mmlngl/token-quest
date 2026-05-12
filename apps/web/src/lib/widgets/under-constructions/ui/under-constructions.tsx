import type { FC } from "react";

const LABEL =
	"UNDER CONSTRUCTION · BUILDING IN PUBLIC · UNDER CONSTRUCTION · BUILDING IN PUBLIC · UNDER CONSTRUCTION · BUILDING IN PUBLIC · ";

export const UnderConstruction: FC = () => {
	return (
		<div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
			<div
				className="absolute"
				style={{
					width: "140vmax",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%) rotate(-45deg)",
				}}
			>
				{/* Hazard stripe top border */}
				<div
					className="w-full h-2"
					style={{
						backgroundImage:
							"repeating-linear-gradient(90deg, #000 0px, #000 20px, #f5e642 20px, #f5e642 40px)",
					}}
				/>

				{/* Main band */}
				<div className="w-full bg-[#f5e642] py-3 flex items-center overflow-hidden">
					<span
						className="font-black text-lg tracking-widest uppercase whitespace-nowrap text-black animate-marquee"
						style={{
							animation: "marquee 18s linear infinite",
						}}
					>
						{LABEL.repeat(3)}
					</span>
				</div>

				{/* Hazard stripe bottom border */}
				<div
					className="w-full h-2"
					style={{
						backgroundImage:
							"repeating-linear-gradient(90deg, #000 0px, #000 20px, #f5e642 20px, #f5e642 40px)",
					}}
				/>
			</div>

			<style>{`
				@keyframes marquee {
					from { transform: translateX(-33.333%); }
					to   { transform: translateX(0); }
				}
			`}</style>
		</div>
	);
};
