import React, { Dispatch, SetStateAction } from "react";
import {
	BerlinLogo,
	CityLabLogo,
	IBBLogo,
	IHKLogo,
	OdisLogo,
	TSBLogo,
} from "@components/logos";

export const Welcome = ({
	setShowWelcome,
}: {
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<>
			<div className="absolute top-0 left-0">
				<div className="flex w-screen h-screen items-center justify-center py-[18px]">
					<div className="flex flex-col w-[320px] bg-white p-5 rounded">
						<h1 className="text-2xl font-bold mb-[16px] text-dark-grey">
							Wie schnell ist Berlins Branchenpuls?
						</h1>

						<p className="leading-4 font-extralight text-sm mb-[24px] text-dark-grey">
							Der BranchenPuls der IHK lorem ipsum dolor sit amet, consectetuer
							adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
							Cum sociis natoque penatibus et magnis dis parturient montes,
							nascetur ridiculus mus. Donec quam felis, ultricies nec,
							pellentesque eu, pretium quis, sem.
						</p>

						<div className="flex flex-col bold">
							<button
								onClick={() => setShowWelcome(false)}
								className="bg-primary hover:bg-darker-primary h-[35px] rounded-md text-white mb-[16px] text-xs font-bolder"
							>
								Alle erkunden
							</button>

							<div className="flex flex-col mb-[16px]">
								<button
									onClick={() => setShowWelcome(false)}
									className="border border-primary rounded-md h-[35px] text-primary hover:text-white hover:bg-primary text-xs mb-[8px] "
								>
									Bäckereien erkunden
								</button>

								<button
									onClick={() => setShowWelcome(false)}
									className="border border-primary rounded-md h-[35px] text-primary hover:text-white hover:bg-primary text-xs "
								>
									Hundefrisöre erkunden
								</button>
							</div>
						</div>

						<p className="italic font-extralight text-xs mb-[24px] text-dark-grey">
							Eine prototypische Datenvisualisierung der Open Data
							Informationsstelle Berlin in Zusammenarbeit mit dem CityLAB Berlin
						</p>

						<div className="grid grid-cols-2 grid-4 gap-[24px]">
							<OdisLogo />
							<CityLabLogo />
							<IHKLogo />
							<TSBLogo />
							<BerlinLogo />
							<IBBLogo />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
