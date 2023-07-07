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

export type MobileWelcomeProps = {
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
	showInfo: Dispatch<SetStateAction<boolean>>;
};

export const MobileWelcome = ({
	setShowWelcome,
	showInfo,
}: MobileWelcomeProps) => {
	return (
		<div className="flex h-screen w-screen items-center justify-center py-[18px] sm:hidden">
			<div className="flex w-[320px] flex-col rounded bg-white p-5">
				<button
					onClick={() => setShowWelcome(false)}
					className="flex w-full justify-end text-dark-grey"
				>
					<CloseIcon />
				</button>
				<h1 className="mb-[16px] text-2xl font-bold text-dark-grey">
					Willkomen am Puls der Berliner Wirtschaft
				</h1>

				<p className="mb-[24px] text-sm font-extralight  text-dark-grey">
					Berlins Wirtschaft ist so bunt wie die Stadt selbst. Mit dem
					Branchenpuls tauchst du in die dynamische Berliner Gewerbelandschaft
					ein. Wo ist die höchste Bäckereindichte? Welche Branchen dominieren
					Neukölln? Exploriere Berlins Gewerbe vom Kiez bis zum Bezirk.
				</p>

				<div className="flex flex-col font-medium">
					<button
						onClick={() => setShowWelcome(false)}
						className=" mb-[16px] h-[35px] rounded-md bg-primary text-xs text-white hover:bg-darker-primary"
					>
						Alle erkunden
					</button>
					<button
						onClick={() => showInfo(true)}
						className="hover:bg-darker-white mb-[16px] h-[35px] rounded-md border-2 border-primary text-xs text-primary hover:bg-gray-100"
					>
						mehr Infos
					</button>

					{/* <div className="mb-[16px] flex flex-col">
						<button
							onClick={() => setShowWelcome(false)}
							className="mb-[8px] h-[35px] rounded-md border border-primary text-xs text-primary hover:bg-primary hover:text-white "
						>
							Bäckereien erkunden
						</button>

						<button
							onClick={() => setShowWelcome(false)}
							className="h-[35px] rounded-md border border-primary text-xs text-primary hover:bg-primary hover:text-white "
						>
							Hundefrisöre erkunden
						</button>
					</div> */}
				</div>

				<p className="mb-[24px] text-xs font-extralight italic text-dark-grey">
					Eine prototypische Datenvisualisierung der Open Data
					Informationsstelle Berlin in Zusammenarbeit mit dem CityLAB Berlin
				</p>

				<div className="grid-4 grid grid-cols-2 gap-[24px]">
					<OdisLogo />
					<CityLabLogo />
					<IHKLogo />
					<TSBLogo />
					<BerlinLogo />
					<IBBLogo />
				</div>
			</div>
		</div>
	);
};
