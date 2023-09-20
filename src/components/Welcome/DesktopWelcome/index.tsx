import {
	BerlinLogoHorizontal,
	CityLabLogo,
	IBBLogo,
	IHKLogo,
	OdisLogo,
	TSBLogo,
} from "@components/logos";
import React, { Dispatch, SetStateAction } from "react";
import { Cross } from "@components/Icons";

export type DesktopWelcomeProps = {
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
	showInfo: Dispatch<SetStateAction<boolean>>;
	setRunJoyride: Dispatch<SetStateAction<boolean>>;
};

export const DesktopWelcome = ({
	setShowWelcome,
	showInfo,
	setRunJoyride,
}: DesktopWelcomeProps) => {
	return (
		<div className="hidden h-screen w-screen items-center justify-center py-[18px] sm:flex">
			<div className="flex h-[465px] w-[754px] flex-col rounded-lg bg-white pl-[48px] pr-[20px] pt-[20px]">
				<button
					onClick={() => setShowWelcome(false)}
					className="flex w-full justify-end text-dark-grey"
				>
					<Cross />
				</button>

				<h1 className="text-2xl font-bold text-dark-grey">
					Willkommen am Puls der Berliner Wirtschaft
				</h1>

				<p className="mt-[24px] text-sm font-extralight  text-dark-grey">
					Berlins Wirtschaft ist so bunt wie die Stadt selbst. Mit dem
					Branchenpuls tauchst du in die dynamische Berliner Gewerbelandschaft
					ein und explorierst Berlins Gewerbe vom Bezirk bis zum Kiez.
					<i>
						Hinweis: Der Branchenpuls befindet sich in der Beta-Version und wird
						im Austausch mit interessierten Akteur:innen stetig
						weiterentwickelt.
					</i>
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
						className="h-[35px] w-[160px] rounded-md border-2 border-primary bg-white text-xs text-primary hover:bg-primary hover:text-white"
					>
						Mehr Infos
					</button>

					<button
						onClick={() => setRunJoyride(true)}
						className="h-[35px] w-[160px] rounded-md border-2 border-primary bg-white text-xs text-primary hover:bg-primary hover:text-white"
					>
						Tour starten
					</button>
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
							<a href="https://odis-berlin.de" target="_blank">
								<OdisLogo />
							</a>
						</div>
						<div className="w-[120px] pl-[26px]">
							<a href="https://citylab-berlin.org/de/start/" target="_blank">
								<CityLabLogo />
							</a>
						</div>
						<div className="w-[120px] pl-[21px]">
							<a
								href="https://www.technologiestiftung-berlin.de"
								target="_blank"
							>
								<TSBLogo />
							</a>
						</div>
					</div>
					<div className="flex">
						<div className="w-[120px]">
							<a href="https://www.ihk.de/berlin/" target="_blank">
								<IHKLogo />
							</a>
						</div>
						<div className="w-[280px] pl-[26px]">
							<a href="https://www.berlin.de/rbmskzl/" target="_blank">
								<BerlinLogoHorizontal />
							</a>
						</div>
						<div className="w-[120px] pl-[21px]">
							<a
								href="https://www.ibb.de/de/startseite/startseite.html"
								target="_blank"
							>
								<IBBLogo />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
