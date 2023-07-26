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
				as="div"
				className="fixed inset-0"
				onClose={() => onClose()}
				open={open}
				style={{ zIndex: 70 }}
			>
				<div className="">
					<>
						<Dialog.Backdrop
							className="fixed inset-0 bg-primary/90"
							style={{ zIndex: 60 }}
							onClick={() => onClose()}
						/>

						<Dialog.Panel>
							<div className="fixed left-0 top-0" style={{ zIndex: 61 }}>
								<div className="flex h-screen w-screen items-center justify-center py-[18px] sm:hidden">
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
							</div>{" "}
						</Dialog.Panel>
					</>
				</div>
			</Dialog>
		</>
	);
};
