import { Dialog } from "@headlessui/react";
import { FC } from "react";
import { Cross } from "../Icons";
import { FilterList } from "@components/FilterIndicator/FilterList";
import { Modal } from "@components/Modal";

export interface DownloadModalType {
	downloadModalOpen: boolean;
	setDownloadModalOpen: (open: boolean) => void;
	confirmed: () => void;
	activeFiltersList: string[];
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
			<Modal
				headerName={"Download"}
				onClose={() => closeModal()}
				open={downloadModalOpen}
			>
				<div className="pb-6">
					{activeFiltersList.length > 1 && (
						<>
							Bitte beachten Sie, dass der Download Ihren Filtereinstellungen
							entspricht. Wenn Sie alle Daten für einen Monat herunterladen
							möchten, setzen Sie bitte zuerst die Filter zurück.
							<br />
							<br />
							Folgende Filter wurden für den Datensatz vom{" "}
							{activeFiltersList[0]} gesetzt:
							<div className="flex flex-wrap pb-2 pt-4">
								<FilterList
									activeFiltersList={activeFiltersList}
									badgeClasses="mr-2"
									hideFirstEntry={true}
								></FilterList>
							</div>
						</>
					)}
					Die Daten werden als <span className="font-bold">CSV-Datei</span>{" "}
					bereitgestellt. CSV steht für &quot;Comma-separated Values&quot; und
					ist ein Format, das sich gut zum Austausch von Tabellen und Listen
					zwischen verschiedenen Programmen und Plattformen eignet.
				</div>
				<div className="flex pb-6">
					<button
						onClick={() => confirmed()}
						className="btn-primary btn-sm btn flex-1 font-normal normal-case text-white "
						// disabled={true}
					>
						CSV Download
					</button>
				</div>
			</Modal>
		</>
	);
};
