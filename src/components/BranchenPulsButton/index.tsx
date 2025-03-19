import { BranchenPulsLogo } from "@components/logos/BranchenPulsLogo";
import { Dispatch, SetStateAction, useState } from "react";
import { BranchenPulsLogoInverted } from "@components/logos/BranchenPulsLogoInverted";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";

export type BranchenPulsButton = {
	showWelcome: boolean;
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
};

export const BranchenPulsButton = ({
	showWelcome,
	setShowWelcome,
}: BranchenPulsButton) => {
	const [isHovering, setIsHovering] = useState(false);
	const hasMobileSize = useHasMobileSize();

	return (
		<>
			<div className="fixed top-0 z-10">
				<button
					onClick={() => setShowWelcome(!showWelcome)}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					title="Startbildschirm öffnen"
					className={`fixed left-2/4 right-3 z-40 mt-[22px] w-max 
					-translate-x-2/4 transform shadow-lg
					sm:left-auto sm:translate-x-0 sm:transform-none
					xl:left-2/4 xl:-translate-x-2/4 xl:transform`}
				>
					{isHovering ? <BranchenPulsLogoInverted /> : <BranchenPulsLogo />}
				</button>
			</div>
		</>
	);
};
