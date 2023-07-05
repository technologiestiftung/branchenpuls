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
			<div className="absolute left-0 top-0">
				<div className="flex h-screen w-screen items-center justify-center py-[18px]">
					<div className="flex w-[320px] flex-col rounded bg-white p-5">
						<h1 className="mb-[16px] text-2xl font-bold text-dark-grey">
							Wie schnell ist Berlins Branchenpuls?
						</h1>

						<p className="mb-[24px] text-sm font-extralight leading-4 text-dark-grey">
							Der BranchenPuls der IHK lorem ipsum dolor sit amet, consectetuer
							adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
							Cum sociis natoque penatibus et magnis dis parturient montes,
							nascetur ridiculus mus. Donec quam felis, ultricies nec,
							pellentesque eu, pretium quis, sem.
						</p>

						<div className="bold flex flex-col">
							<button
								onClick={() => setShowWelcome(false)}
								className="font-bolder mb-[16px] h-[35px] rounded-md bg-primary text-xs text-white hover:bg-darker-primary"
							>
								Alle erkunden
							</button>

							<div className="mb-[16px] flex flex-col">
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
							</div>
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
			</div>
		</>
	);
};
