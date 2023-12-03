"use client";

import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { RiFileForbidLine } from "react-icons/ri";
import { CancelContract } from "../actions/_contract";
import toast from "react-hot-toast";

interface CancelContractButton {
  contract_id: string;
}

const CancelContractButton = ({ contract_id }: CancelContractButton) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleCancelContractClick = async () => {
    await CancelContract(contract_id)
      .then(() => {
        toast.success("O contrato foi rescindido com sucesso!", {
          style: {
            padding: "12px",
          },
        });
      });

    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center justify-center py-2 px-4 shadow-md rounded-md gap-x-2 bg-red-500 text-white hover:text-opacity-80 focus:outline-none"
      >
        <i className="text-xl">
          <RiFileForbidLine />
        </i>
        Rescindir contrato
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full flex items-center justify-between mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-dark_bg text-2xl _title mb-0 font-bold"
                    >
                      Rescisão de contrato
                    </Dialog.Title>
                  </div>

                  <div className="w-full flex flex-col items-start gap-y-4 mt-2">
                    <p className="">
                      Antes de prosseguir com a rescisão deste contrato, é importante <b>confirmar sua decisão</b>. Gostaria de prosseguir?
                    </p>
                    <div className="flex items-center justify-between gap-x-5 w-full pt-4">
                      <button
                        onClick={closeModal}
                        className="py-2 px-4 text-sm rounded-[8px] font-semibold bg-neutral-800 text-white hover:bg-neutral-700 ease-out duration-200"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={handleCancelContractClick}
                        className="flex items-center gap-x-2 bg-red-100 text-red-900 py-2 px-4 text-sm rounded-[8px] font-semibold hover:bg-red-200"
                      >
                        Rescindir contrato
                        <i className="text-xl">
                          <RiFileForbidLine />
                        </i>
                      </button>
                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CancelContractButton;