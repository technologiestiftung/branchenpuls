import {
	BerlinLogo,
	CityLabLogo,
	IBBLogo,
	IHKLogo,
	OdisLogo,
	TSBLogo,
} from "@components/logos";
import React, { Dispatch, SetStateAction } from "react";
import { Cross } from "@components/Icons";

export type MobileWelcomeProps = {
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
	showInfo: Dispatch<SetStateAction<boolean>>;
	setRunJoyride: Dispatch<SetStateAction<boolean>>;
};

export const MobileWelcome = ({
	setShowWelcome,
	showInfo,
	setRunJoyride,
}: MobileWelcomeProps) => {
	return (
		<div className="flex h-screen w-screen items-center justify-center py-[18px] sm:hidden">
			<div className="flex w-[320px] flex-col rounded-lg bg-white p-5">
				<button
					onClick={() => setShowWelcome(false)}
					className="flex w-full justify-end text-dark-grey"
				>
					<Cross />
				</button>
				<h1 className="mb-[16px] text-2xl font-bold text-dark-grey">
					Willkommen am Puls der Berliner Wirtschaft
				</h1>

				<p className="text-sm font-extralight  text-dark-grey">
					Berlins Wirtschaft ist so bunt wie die Stadt selbst. Mit dem
					Branchenpuls tauchst du in die dynamische Berliner Gewerbelandschaft
					ein und explorierst Berlins Gewerbe vom Bezirk bis zum Kiez.
				</p>

				<p className="mb-[24px] mt-2 text-xs font-extralight italic">
					Hinweis: Der Branchenpuls ist ein erster Prototyp und wird
					im Austausch mit interessierten Akteur:innen weiterentwickelt.
				</p>

				<div className="flex flex-col font-medium">
					<button
						onClick={() => setShowWelcome(false)}
						className=" mb-[16px] h-[35px] rounded-md bg-primary text-xs text-white hover:bg-darker-primary"
					>
						Karte erkunden
					</button>
					<button
						onClick={() => showInfo(true)}
						className="mb-[16px] h-[35px] rounded-md border-2 border-primary text-xs text-primary hover:bg-primary hover:text-white"
					>
						Mehr Infos
					</button>
					<button
						onClick={() => setRunJoyride(true)}
						className="mb-[16px] h-[35px] rounded-md border-2 border-primary text-xs text-primary hover:bg-primary hover:text-white"
					>
						Tour starten
					</button>
				</div>

				<p className="mb-[24px] text-xs font-extralight italic text-dark-grey">
					Eine prototypische Datenvisualisierung der Open Data
					Informationsstelle Berlin in Zusammenarbeit mit dem CityLAB Berlin.
				</p>

				<div className="grid-4 grid grid-cols-2 gap-[24px]">
					<a href="https://odis-berlin.de" target="_blank">
						<OdisLogo />
					</a>
					<a href="https://citylab-berlin.org/de/start/" target="_blank">
						<CityLabLogo />
					</a>
					<a href="https://www.technologiestiftung-berlin.de" target="_blank">
						<TSBLogo />
					</a>
					<a href="https://www.ihk.de/berlin/" target="_blank">
						<IHKLogo />
					</a>
					<a href="https://www.berlin.de/rbmskzl/" target="_blank">
						<BerlinLogo />
					</a>
					<a
						href="https://www.ibb.de/de/startseite/startseite.html"
						target="_blank"
					>
						<IBBLogo />
					</a>
				</div>
			</div>
		</div>
	);
};
