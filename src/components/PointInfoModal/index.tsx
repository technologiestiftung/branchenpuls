import { Dialog } from "@headlessui/react";
import { FC } from "react";
import {
	BusinessAtPointData,
	BusinessData,
} from "../../../pages/api/getsinglepointdata";

export interface PointInfoModalType {
	poinInfoModalOpen: boolean;
	setPoinInfoModalOpen: (date: boolean) => void;
	businessAtPointData: BusinessAtPointData;
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
					content={business.branch_top_level_description}
				></Subsection>
				<Subsection title="NACE" content={business.branch_nace}></Subsection>
				<Subsection
					title="Beschäftigtenanzahl"
					content={business.employees_range}
				></Subsection>
				<Subsection
					title="Unternehmensalter"
					content={business.business_age.toString() + " Jahre"}
				></Subsection>
				<Subsection
					title="Unternehmenstyp"
					content={business.business_type}
				></Subsection>
			</div>
		</>
	);
};

export const PointInfoModal: FC<PointInfoModalType> = ({
	poinInfoModalOpen,
	setPoinInfoModalOpen,
	businessAtPointData,
	color,
}) => {
	function closeModal() {
		setPoinInfoModalOpen(false);
	}

	return (
		<>
			{businessAtPointData && (
				<Dialog
					as="div"
					className="fixed inset-0 z-10"
					onClose={closeModal}
					open={poinInfoModalOpen}
				>
					<div className="min-h-screen text-center">
						<Dialog.Backdrop className="fixed inset-0 bg-white/80" />

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>

						<div
							className="my-8 inline-block w-full max-w-xl rounded-2xl bg-white p-6 text-left align-middle shadow-lg"
							style={{ maxHeight: "50vh", overflowY: "scroll" }}
						>
							<Dialog.Title className="bg-white text-xl leading-6">
								<div className="grid grid-cols-1 gap-1 text-sm">
									<div className="grid grid-cols-12 text-xl">
										<div
											className="col-span-1 h-7 w-7 rounded-full"
											style={{ backgroundColor: color }}
										/>
										<div className="align-center col-span-11 flex items-center font-bold">
											Eingetragene Unternehmen (
											{businessAtPointData.businesses.length})
										</div>
									</div>
									<div>
										Für den Standort: {businessAtPointData.latitude},{" "}
										{businessAtPointData.longitude}
									</div>
									<div>
										Planungsraum:{" "}
										{businessAtPointData.businesses[0].planungsraum}
									</div>
								</div>
							</Dialog.Title>

							<Dialog.Panel>
								<div className="mt-2">
									<div className="grid grid-cols-6 gap-5">
										<div className="col-span-6"></div>
										{businessAtPointData.businesses.map((b, idx) => (
											<Section
												key={b.opendata_id}
												index={idx}
												totalCount={businessAtPointData.businesses.length}
												business={b}
											></Section>
										))}
									</div>
								</div>
							</Dialog.Panel>
						</div>
					</div>
				</Dialog>
			)}
		</>
	);
};
