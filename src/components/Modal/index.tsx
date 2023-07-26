import { FC, ReactNode } from "react";
import { Cross } from "@components/Icons";
import { Dialog } from "@headlessui/react";

export interface ModalType {
	headerName: string;
	onClose: () => void;
	children: ReactNode;
	open: boolean;
}

export const Modal: FC<ModalType> = ({
	headerName,
	children,
	onClose,
	open,
}) => {
	return (
		<>
			<Dialog
				open={open}
				onClose={() => onClose()}
				className="relative z-50"
				style={{ zIndex: 70 }}
			>
				<div
					className="fixed inset-0 bg-primary/90"
					// aria-hidden="true"
				/>

				<div className="fixed inset-0 flex items-center justify-center p-4">
					<Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
						<div className="flex  items-center justify-center">
							<div className="flex w-[320px] flex-col rounded-lg bg-white p-5">
								<button
									onClick={() => onClose()}
									className="flex w-full justify-end text-dark-grey"
								>
									<Cross />
								</button>
								<h1 className="mb-[16px] text-lg font-bold text-dark-grey">
									{headerName}
								</h1>
								{children}
							</div>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</>
	);
};
