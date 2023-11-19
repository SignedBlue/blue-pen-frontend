"use client";

import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// interface ContractFilterProps {
//   users?: TUserData[];
// }

const ContractFilter = () => {

  type TabOptions = "details" | "payments"
  const [tab, setTab] = useState<TabOptions>("details");
  const [details, setDetails] = useState<string>();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "text-white" : "text-white/90"}
                group inline-flex items-center gap-x-2 rounded-md bg-black/50 px-3 py-2 text-base font-medium hover:text-white focus:outline-none hover:bg-black/40`}
          >
            <span>Filtros</span>
            <FaChevronDown
              className={`
                  ${open ? "text-neutral-300" : "text-neutral-300/70"}
                   h-3 w-3 transition duration-150 ease-in-out group-hover:text-neutral-300/80`}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 mt-3 !z-[200] transform px-4 bg-black/70 backdrop-blur-md font-medium rounded-xl flex flex-col items-center gap-y-3 w-[350px]">
              <nav className="w-full flex items-center justify-between space-x-1 rounded-xl bg-neutral-500/40 p-1 font-medium text-sm">
                <button
                  className={`${tab === "details" ? "bg-white text-neutral-600 pointer-events-none" : "hover:bg-white/30 ease-out duration-100"} w-full p-2 rounded-lg`}
                  onClick={() => setTab("details")}
                >
                  Detalhes
                </button>
                <button
                  className={`${tab === "payments" ? "bg-white text-neutral-600 pointer-events-none" : "hover:bg-white/30 ease-out duration-100"} w-full p-2 rounded-lg`}
                  onClick={() => setTab("payments")}
                >
                  Pagamentos
                </button>
              </nav>
              {tab === "details" && (
                <div className="w-full flex flex-col items-start gap-2 text-sm">
                  <label htmlFor="duracao" className="whitespace-nowrap">Duração até:</label>
                  <input
                    id="duracao"
                    type="number"
                    className="outline-none focus:outline-none text-neutral-500 appearance-none p-1 rounded-md"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
              )
              }

              <div className="flex items-center justify-between gap-x-5 w-full py-4">
                <Link
                  href={`/admin/contratos?duration=${details}`}
                  className="border p-2 text-sm rounded-md font-semibold bg-white text-neutral-800 hover:bg-white/80 ease-out duration-200"
                >
                  Filtrar
                </Link>
                <button
                  onClick={() => setDetails("")}
                  className="border p-2 text-sm rounded-md font-semibold hover:bg-black/20"
                >
                  Limpar
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ContractFilter;