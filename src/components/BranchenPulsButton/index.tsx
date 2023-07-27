import { BranchenPulsLogo } from "@components/Logos/BranchenPulsLogo";
import { Dispatch, SetStateAction, useState } from "react";
import { BranchenPulsLogoInverted } from "@components/Logos/BranchenPulsLogoInverted";

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
				<div className="flex w-screen justify-center pt-[22px]">
					<button
						onClick={() => setShowWelcome(!showWelcome)}
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						title="Startbildschirm öffnen"
						className="shadow-lg"
					>
						{isHovering ? <BranchenPulsLogoInverted /> : <BranchenPulsLogo />}
					</button>
				</div>
			</div>
		</>
	);
};
