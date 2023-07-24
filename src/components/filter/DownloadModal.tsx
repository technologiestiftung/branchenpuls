import { Dialog } from "@headlessui/react";
import { FC } from "react";
import { Cross } from "../Icons";
import { FilterIndicator } from "@components/FilterIndicator";

export interface DownloadModalType {
	downloadModalOpen: boolean;
	setDownloadModalOpen: (open: boolean) => void;
	confirmed: () => void;
	activeFiltersList: number[];
}

export const DownloadModal: FC<DownloadModalType> = ({
	downloadModalOpen,
	setDownloadModalOpen,
	confirmed,
	activeFiltersList,
}) => {
	function closeModal() {
		setDownloadModalOpen(false);
	}

	return (
		<>
			<Dialog
				as="div"
				className="fixed inset-0"
				onClose={closeModal}
				open={downloadModalOpen}
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
						<div className="relative my-8 inline-block w-full max-w-xl rounded-2xl bg-white px-8 py-4 text-left align-middle shadow-lg">
							<Dialog.Title className="sticky top-0 bg-white pb-6 text-xl leading-6">
								<div className="flex w-full flex-col text-sm">
									<div className="flex items-start gap-2">
										<div className="flex w-0 grow flex-col pt-6 text-xl font-bold">
											Download
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
									{activeFiltersList.length > 0 && (
										<>
											Bitte beachten Sie, dass der Download Ihren
											Filtereinstellungen entspricht. Wenn Sie alle Daten für
											einen Monat herunterladen möchten, setzen Sie bitte zuerst
											die Filter zurück.
											<br />
											<br />
											Folgende Filter wurden gesetzt:
											<div className="flex flex-wrap pb-2 pt-4">
												<FilterIndicator
													activeFiltersList={activeFiltersList}
												></FilterIndicator>
											</div>
										</>
									)}
									Die Daten werden als{" "}
									<span className="font-bold">CSV-Datei</span> bereitgestellt.
									CSV steht für "Comma-separated Values" und ist ein Format, das
									sich gut zum Austausch von Tabellen und Listen zwischen
									verschiedenen Programmen und Plattformen eignet.
								</div>
								<div className="flex pb-6">
									<button
										onClick={() => confirmed()}
										className="btn-primary btn-sm btn flex-1 font-normal normal-case text-white "
										// disabled={true}
									>
										CSV Download
									</button>

									{/* <button
										// onClick={resetFilterData}
                                        onClick={() => applyPreviousLayer()}

										className="btn-outline btn-primary btn-sm btn ml-1 flex-1 font-normal normal-case text-white "
										// disabled={true}
									>
										Filter zurücksetzen
									</button> */}
								</div>
							</Dialog.Panel>
						</div>
					</>
				</div>
			</Dialog>
		</>
	);
};
