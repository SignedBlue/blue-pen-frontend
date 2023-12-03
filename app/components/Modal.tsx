"use client";

import { Dialog, Transition } from "@headlessui/react";
import HTMLReactParser from "html-react-parser";
import { Fragment, useState } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface ModalProps {
  title: string;
  content: string;
}

const Modal = ({ title, content }: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const paragraphs = content.split("--break--");

  function nextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, paragraphs.length - 1));
  }

  function prevPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    setCurrentPage(0);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-white text-2xl hover:text-opacity-80 focus:outline-none"
      >
        <BsQuestionCircleFill />
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
            <div className="fixed inset-0 bg-black/50" />
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
                      className="text-black text-2xl _title mb-0 font-bold"
                    >
                      {title}
                    </Dialog.Title>

                    <button
                      type="button"
                      className="flex justify-center items-center rounded-md font-bold bg-red-100 h-[30px] w-[30px] text-sm text-red-900 hover:bg-red-200 focus:outline-none"
                      onClick={closeModal}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>

                  <div className="mt-2 min-h-[150px] _help">{HTMLReactParser(paragraphs[currentPage])}</div>

                  {paragraphs.length > 1 &&
                    <div className="flex justify-between gap-x-2 mt-10">
                      <button
                        type="button"
                        disabled={currentPage === 0}
                        onClick={prevPage}
                        className={`inline-flex justify-center items-center gap-x-1 px-2 h-[40px] rounded-md text-sm font-medium focus:outline-none ${currentPage === 0 ? "pointer-events-none opacity-0" : "bg-blue-100 hover:bg-blue-200 text-blue-900"}`}
                      >
                        <MdArrowBackIosNew />
                        <span className="text-sm">Anterior</span>
                      </button>

                      <div className="flex items-center justify-center text-sm text-neutral-400 cursor-default">
                        <span className="w-4 flex items-center justify-center">{currentPage + 1}</span>
                        <span>/</span>
                        <span className="w-4 flex items-center justify-center font-bold">{paragraphs.length}</span>
                      </div>

                      <button
                        type="button"
                        disabled={currentPage === paragraphs.length - 1}
                        onClick={nextPage}
                        className={`inline-flex justify-center items-center gap-x-1 px-2 h-[40px] rounded-md text-sm font-medium focus:outline-none ${currentPage === paragraphs.length - 1 ? "pointer-events-none opacity-0" : "bg-blue-100 hover:bg-blue-200 text-blue-900"}`}
                      >
                        <span className="text-sm">Próximo</span>
                        <MdArrowForwardIos />
                      </button>
                    </div>
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;