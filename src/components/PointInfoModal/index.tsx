import { Dialog } from "@headlessui/react";
import { FC } from "react";
import {
	BusinessAtPointData,
	BusinessData,
} from "../../../pages/api/getsinglepointdata";
import { Cross, Spinner } from "../Icons";
import { toFullText } from "@lib/helper";

export interface PointInfoModalType {
	poinInfoModalOpen: boolean;
	setPoinInfoModalOpen: (date: boolean) => void;
	businessAtPointData: BusinessAtPointData;
	setBusinessAtPoint: (businessAtPoint: undefined) => void;
	color: string;
}

interface SectionProps {
	index: number;
	totalCount: number;
	business: BusinessData;
}

interface SubsectionProps {
	title: string;
	content: string;
}

const Subsection: FC<SubsectionProps> = ({ title, content }) => {
	return (
		<div>
			<div className="font-bold">{title}</div>
			<div>{content}</div>
		</div>
	);
};

const Section: FC<SectionProps> = ({ index, totalCount, business }) => {
	return (
		<>
			<div className="col-span-6 border-t"></div>
			<div className="text-md col-span-1">
				{index + 1} / {totalCount}
			</div>
			<div className="text-md col-span-5 grid grid-cols-1 gap-3">
				<Subsection
					title="Branchentyp"
					content={
						business.branch_top_level_description
							? toFullText(business.branch_top_level_description)
							: "keine Angabe"
					}
				></Subsection>
				<Subsection
					title="NACE"
					content={
						business.branch_nace
							? toFullText(business.branch_nace)
							: "keine Angabe"
					}
				></Subsection>
				<Subsection
					title="IHK ID"
					content={
						business.branch_description
							? toFullText(business.branch_description)
							: "keine Angabe"
					}
				></Subsection>
				<Subsection
					title="Beschäftigtenanzahl"
					content={
						business.employees_range ? business.employees_range : "keine Angabe"
					}
				></Subsection>
				<Subsection
					title="Unternehmensalter"
					content={
						business.business_age !== undefined
							? business.business_age?.toString() + " Jahre"
							: "keine Angabe"
					}
				></Subsection>
				<Subsection
					title="Unternehmenstyp"
					content={
						business.business_type ? business.business_type : "keine Angabe"
					}
				></Subsection>
			</div>
		</>
	);
};

export const PointInfoModal: FC<PointInfoModalType> = ({
	poinInfoModalOpen,
	setPoinInfoModalOpen,
	businessAtPointData,
	setBusinessAtPoint,
	color,
}) => {
	function closeModal() {
		setPoinInfoModalOpen(false);
		setBusinessAtPoint(undefined);
	}

	return (
		<>
			<Dialog
				as="div"
				className="fixed inset-0"
				onClose={closeModal}
				open={poinInfoModalOpen}
				style={{ zIndex: 70 }}
			>
				<div className="min-h-screen text-center">
					<>
						<Dialog.Backdrop
							className="fixed inset-0 bg-white/80"
							style={{ zIndex: 60 }}
						/>
						{/* This element is to trick the browser into centering the modal
							contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<div
							className="relative my-8 inline-block w-full max-w-xl rounded-2xl bg-white px-6 text-left align-middle shadow-lg"
							style={{
								maxHeight: "50vh",
								overflowY: businessAtPointData && "scroll",
							}}
						>
							<Dialog.Title className="sticky top-0 bg-white pb-6 text-xl leading-6">
								<div className="flex w-full flex-col text-sm">
									<div className="flex items-start gap-2">
										<div
											className="mt-[25px] h-[20px] w-[20px] rounded-full"
											style={{ backgroundColor: color }}
										/>
										<div className="flex w-0 grow flex-col pt-6">
											<div className="text-xl font-bold">
												Eingetragene Unternehmen{" "}
												{businessAtPointData &&
													`(${businessAtPointData.businesses.length})`}
											</div>
											{businessAtPointData && (
												<>
													<div>
														Für den Standort: {businessAtPointData.latitude},{" "}
														{businessAtPointData.longitude}
													</div>
													<div>
														Planungsraum:{" "}
														{businessAtPointData.businesses[0].planungsraum}
													</div>
												</>
											)}
										</div>
										<button
											className="text-textcolor pt-2"
											onClick={closeModal}
										>
											<Cross />
										</button>
									</div>
								</div>
							</Dialog.Title>

							<Dialog.Panel>
								<div className="pb-6">
									{businessAtPointData ? (
										<div className="grid grid-cols-6 gap-5">
											{businessAtPointData.businesses.map((b, idx) => (
												<Section
													key={b.opendata_id}
													index={idx}
													totalCount={businessAtPointData.businesses.length}
													business={b}
												></Section>
											))}
										</div>
									) : (
										<p className="flex items-center gap-2">
											Daten werden geladen...
											<span className="animate-spin">
												<Spinner />
											</span>
										</p>
									)}
								</div>
							</Dialog.Panel>
						</div>
					</>
				</div>
			</Dialog>
		</>
	);
};
