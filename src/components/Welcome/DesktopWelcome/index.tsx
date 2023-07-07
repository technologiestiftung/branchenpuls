import {
	BerlinLogo,
	CityLabLogo,
	IBBLogo,
	IHKLogo,
	OdisLogo,
	TSBLogo,
} from "@components/logos";
import React, { Dispatch, SetStateAction } from "react";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

export type DesktopWelcomeProps = {
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
	showInfo: Dispatch<SetStateAction<boolean>>;
};

export const DesktopWelcome = ({
	setShowWelcome,
	showInfo,
}: DesktopWelcomeProps) => {
	return (
		<div className="hidden h-screen w-screen items-center justify-center py-[18px] sm:flex">
			<div className="flex h-[465px] w-[754px] flex-col rounded-lg bg-white pl-[48px] pr-[20px] pt-[20px]">
				<button
					onClick={() => setShowWelcome(false)}
					className="flex w-full justify-end text-dark-grey"
				>
					<CloseIcon />
				</button>

				<h1 className="text-2xl font-bold text-dark-grey">
					Willkomen am Puls der Berliner Wirtschaft
				</h1>

				<p className="mt-[24px] text-sm font-extralight  text-dark-grey">
					Berlins Wirtschaft ist so bunt wie die Stadt selbst. Mit dem
					Branchenpuls tauchst du in die dynamische Berliner Gewerbelandschaft
					ein. In welchen Stadtteilen dominieren welche Branchen? Wie entwickelt
					sich die Unternehmens- und Geschäftsansiedlungen über die Zeit?
					<br></br>
					Exploriere und vergleiche Berlins Gewerbe vom Bezirk bis zum Kiez.
				</p>

				<div className="mt-[24px] flex gap-[8px] font-medium">
					<button
						onClick={() => setShowWelcome(false)}
						className="h-[35px] w-[160px] rounded-md bg-primary text-xs text-white hover:bg-darker-primary"
					>
						Karte erkunden
					</button>

					<button
						onClick={() => showInfo(true)}
						className="h-[35px] w-[160px] rounded-md border-2 border-primary bg-white text-xs text-primary hover:bg-gray-100"
					>
						Mehr Infos
					</button>

					{/* <button
						onClick={() => setShowWelcome(false)}
						className="mb-[8px] h-[35px] w-[160px] rounded-md border border-primary text-xs text-primary hover:bg-primary hover:text-white "
					>
						Bäckereien erkunden
					</button>

					<button
						onClick={() => setShowWelcome(false)}
						className="h-[35px] w-[160px] rounded-md border border-primary text-xs text-primary hover:bg-primary hover:text-white "
					>
						Hundefrisöre erkunden
					</button> */}
				</div>

				<p className="mt-[53px] text-xs font-extralight italic text-dark-grey">
					Eine prototypische Datenvisualisierung der Open Data
					Informationsstelle Berlin
					<br />
					in Zusammenarbeit mit dem CityLAB Berlin in Kooperation mit der IHK
					Berlin.
				</p>

				<div className="mt-[16px] flex h-[90px] flex-col justify-between">
					<div className="flex items-start">
						<div className="w-[120px]">
							<OdisLogo />
						</div>
						<div className="w-[120px] pl-[26px]">
							<CityLabLogo />
						</div>
						<div className="w-[120px] pl-[21px]">
							<TSBLogo />
						</div>
					</div>
					<div className="flex">
						<div className="w-[120px]">
							<IHKLogo />
						</div>
						<div className="w-[120px] pl-[26px]">
							<BerlinLogo />
						</div>
						<div className="w-[120px] pl-[21px]">
							<IBBLogo />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
