import { FC } from "react";
import { Dialog } from "@headlessui/react";
import { Cross } from "../Icons";

export interface PointInfoModalType {
  poinInfoModalOpen: boolean;
  setPoinInfoModalOpen: (date: boolean) => void;
  data: Array<any>;
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
      {pointData.info !== undefined && (
        <Dialog
          open={poinInfoModalOpen}
          as="div"
          className="relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-secondary/80" aria-hidden="true" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 leading-7">
              <Dialog.Panel className="max-h-80 overflow-auto absolute border border-primary/50  bg-secondary text-textcolor/90 max-h-full p-6 max-w-xs md:max-w-none filter drop-shadow-lg rounded-lg md:min-w-xl md:w-1/2 mx-auto transition-all">
                <button
                  className="text-textcolor focus:outline-none top-0 right-0 m-4 absolute cursor-pointer z-20 hover:bg-textcolor border-textcolor border-2 rounded-full p-1 hover:text-white"
                  onClick={closeModal}
                >
                  <Cross />
                </button>

                {pointData.info.map((d: any, i: number) => (
                  <div key={i + "-key"} className="p-4">
                    {Object.keys(d).map((dd: any, i: number) => (
                      <div key={i + "-keyy"} className="first:font-bold">
                        {dd} : {d[dd]}
                      </div>
                    ))}
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
