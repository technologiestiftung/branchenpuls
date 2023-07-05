import { FC } from "react";
import { Dialog } from "@headlessui/react";
import { Cross } from "../Icons";
import { PointData } from "../filter/FilterLayer";

export interface PointInfoModalType {
	poinInfoModalOpen: boolean;
	setPoinInfoModalOpen: (date: boolean) => void;
	pointData: PointData;
}

export const PointInfoModal: FC<PointInfoModalType> = ({
	poinInfoModalOpen,
	setPoinInfoModalOpen,
	pointData,
}) => {
	function closeModal() {
		setPoinInfoModalOpen(false);
	}

	return (
		<>
			{pointData && (
				<Dialog
					open={poinInfoModalOpen}
					as="div"
					className="relative z-50"
					onClose={closeModal}
				>
					<div className="fixed inset-0 bg-secondary/80" aria-hidden="true" />
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 leading-7">
							<Dialog.Panel className="text-textcolor/90 md:min-w-xl absolute mx-auto max-h-80  max-h-full max-w-xs overflow-auto rounded-lg border border-primary/50 bg-secondary p-6 drop-shadow-lg filter transition-all md:w-1/2 md:max-w-none">
								<button
									className="text-textcolor hover:bg-textcolor border-textcolor absolute right-0 top-0 z-20 m-4 cursor-pointer rounded-full border-2 p-1 hover:text-white focus:outline-none"
									onClick={closeModal}
								>
									<Cross />
								</button>
								<div key={"point-lat-lng"} className="p-4">
									Location: {pointData.latitude}, {pointData.longitude}
								</div>
								<div key={"planungsraum"} className="p-4">
									Planungsraum: {pointData.planungsraum}
								</div>
								{pointData.businesses.map((b) => (
									<div key={""} className="p-4">
										{/* TODO: Build pretty UI for this, right now just dumping the business info */}
										{JSON.stringify(b)}
									</div>
								))}
							</Dialog.Panel>
						</div>
					</div>
				</Dialog>
			)}
		</>
	);
};
