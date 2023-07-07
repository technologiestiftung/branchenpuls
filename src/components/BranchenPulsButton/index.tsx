import { BranchenPulsLogo } from "@components/logos/BranchenPulsLogo";
import { Dispatch, SetStateAction } from "react";

export type BranchenPulsButton = {
	showWelcome: boolean;
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
};

export const BranchenPulsButton = ({
	showWelcome,
	setShowWelcome,
}: BranchenPulsButton) => {
	return (
		<>
			<div className="fixed top-0 z-10">
				<div className="flex w-screen justify-center pt-[22px]">
					<button
						onClick={() => setShowWelcome(!showWelcome)}
						className="rounded bg-white shadow-lg"
					>
						<BranchenPulsLogo />
					</button>
				</div>
			</div>
		</>
	);
};
