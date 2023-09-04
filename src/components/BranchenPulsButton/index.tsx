import { BranchenPulsLogo } from "@components/logos/BranchenPulsLogo";
import { Dispatch, SetStateAction, useState } from "react";
import { BranchenPulsLogoInverted } from "@components/logos/BranchenPulsLogoInverted";

export type BranchenPulsButton = {
	showWelcome: boolean;
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
};

export const BranchenPulsButton = ({
	showWelcome,
	setShowWelcome,
}: BranchenPulsButton) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<>
			<div className="fixed top-0 z-10">
				<button
					onClick={() => setShowWelcome(!showWelcome)}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					title="Startbildschirm öffnen"
					className="fixed left-2/4 z-40 mt-[22px] -translate-x-2/4 transform shadow-lg"
				>
					{isHovering ? <BranchenPulsLogoInverted /> : <BranchenPulsLogo />}
				</button>
			</div>
		</>
	);
};
