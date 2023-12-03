"use client";

import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface ContractFilterProps {
  isAdmin?: boolean;
}

const ContractFilter = ({ isAdmin = false }: ContractFilterProps) => {

  type TOptions = "contract" | "payments" | "client";
  const [tab, setTab] = useState<TOptions>("contract");
  type TDetails = {
    duration?: string;
    client_name?: string;
    near_expiration?: string;
    sign_status?: "signed" | "unsigned" | "";
    termination_date?: null | "true";
  }

  const [details, setDetails] = useState<TDetails>({});

  const formatQueryParams = (details: TDetails): string => {
    const queryParams = [];

    if (details.duration) {
      queryParams.push(`duration=${details.duration}`);
    }

    if (details.sign_status) {
      queryParams.push(`sign_status=${details.sign_status}`);
    }

    if (details.client_name) {
      queryParams.push(`client_name=${details.client_name}`);
    }

    if (details.near_expiration) {
      queryParams.push(`near_expiration=${details.near_expiration}`);
    }

    if (details.termination_date) {
      queryParams.push(`expired=${details.termination_date}`);
    }

    return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "text-white" : "text-white/90"}
                group inline-flex items-center gap-x-2 rounded-md bg-black/80 px-3 py-2 text-base font-medium hover:text-white focus:outline-none hover:bg-black/50`}
          >
            <span>Filtros</span>
            <FaChevronDown
              className={`
                  ${open ? "text-neutral-300 rotate-180" : "text-neutral-300/70"}
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
            <Popover.Panel className="absolute right-0 mt-3 !z-[200] transform bg-black/80 backdrop-blur-md backdrop-brightness-90 font-medium rounded-xl flex flex-col items-center gap-y-3 w-[350px]">
              <nav className="w-full flex items-center justify-between space-x-2 rounded-xl p-1 font-medium text-sm">
                <button
                  className={`${tab === "contract" ? "bg-white text-neutral-600 font-bold pointer-events-none" : "hover:bg-white/30 ease-out duration-100"} w-full p-2 rounded-lg`}
                  onClick={() => setTab("contract")}
                >
                  Contrato
                </button>
                {/* <button
                  className={`${tab === "payments" ? "bg-white text-neutral-600 font-bold pointer-events-none" : "hover:bg-white/30 ease-out duration-100"} w-full p-2 rounded-lg`}
                  onClick={() => setTab("payments")}
                >
                  Pagamentos
                </button> */}
                {isAdmin &&
                  <button
                    className={`${tab === "client" ? "bg-white text-neutral-600 font-bold pointer-events-none" : "hover:bg-white/30 ease-out duration-100"} w-full p-2 rounded-lg`}
                    onClick={() => setTab("client")}
                  >
                    Cliente
                  </button>
                }
              </nav>

              <div className="w-full flex flex-col items-center p-4">
                {tab === "contract" &&
                  (
                    <div className="w-full flex flex-col items-start gap-3 text-sm">
                      <div className="flex flex-col items-start gap-2">
                        <label className="font-bold tracking-wide mb-1" htmlFor="duracao">Duração até (meses):</label>
                        <input
                          id="duracao"
                          type="number"
                          className="outline-none focus:outline-none text-neutral-500 appearance-none py-1 px-2 rounded-md"
                          value={details?.duration || ""}
                          onChange={(e) => setDetails({ ...details, duration: e.target.value })}
                        />
                      </div>
                      {/* <div className="flex flex-col items-start gap-2">
                        <label htmlFor="near_expiration">Expiração próxima</label>
                        <input
                          id="near_expiration"
                          type="number"
                          className="outline-none focus:outline-none text-neutral-500 appearance-none p-1 rounded-md"
                          value={details?.near_expiration || ""}
                          onChange={(e) => setDetails({ ...details, near_expiration: e.target.value })}
                        />
                      </div> */}

                      <div className="flex flex-col items-start gap-2">
                        <span className="font-bold tracking-wide mb-1">Status de assinatura:</span>
                        <div className="flex items-center justify-center gap-x-2 ml-2">
                          <input
                            type="radio"
                            name="sign_status"
                            id="all"
                            checked={details.sign_status === "" || !details.sign_status}
                            onChange={() => setDetails({ ...details, sign_status: "" })}
                          />
                          <label htmlFor="all">Todos</label>
                        </div>

                        <div className="flex items-center justify-center gap-x-2 ml-2">
                          <input
                            type="radio"
                            name="sign_status"
                            id="signed"
                            checked={details.sign_status === "signed"}
                            onChange={() => setDetails({ ...details, sign_status: "signed" })}
                          />
                          <label htmlFor="signed">Assinado</label>
                        </div>

                        <div className="flex items-center justify-center gap-x-2 ml-2">
                          <input
                            type="radio"
                            name="sign_status"
                            id="unsigned"
                            checked={details.sign_status === "unsigned"}
                            onChange={() => setDetails({ ...details, sign_status: "unsigned" })}
                          />
                          <label htmlFor="unsigned">Não assinado</label>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-2">
                        <span className="font-bold tracking-wide mb-1">Status do contrato:</span>
                        <div className="flex items-center justify-center gap-x-2 ml-2">
                          <input
                            type="checkbox"
                            id="termination_date"
                            checked={details.termination_date === "true"}
                            onChange={(e) => setDetails({ ...details, termination_date: e.target.checked ? "true" : null })}
                          />
                          <label htmlFor="termination_date">Vencido / Rescindido</label>
                        </div>
                      </div>
                    </div>
                  )
                }
                {tab === "payments" && (
                  <div className="w-full flex flex-col items-start gap-3 text-sm min-h-[100px]">
                    payments
                  </div>
                )}
                {tab === "client" && (
                  <div className="w-full flex flex-col items-start gap-3 text-sm min-h-[100px]">
                    <div className="flex flex-col items-start gap-2">
                      <label className="font-bold tracking-wide mb-1" htmlFor="nome">Nome do cliente:</label>
                      <input
                        id="nome"
                        type="text"
                        className="outline-none focus:outline-none text-neutral-500 appearance-none py-1 px-2 rounded-md"
                        value={details?.client_name || ""}
                        onChange={(e) => setDetails({ ...details, client_name: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-x-5 w-full mt-6">
                  <Link
                    href={isAdmin ? "/admin/contratos" : "/contratos"}
                    onClick={() => setDetails({})}
                    className={"border py-2 px-4 text-sm rounded-md font-semibold hover:bg-black/50"}
                  >
                    Limpar
                  </Link>
                  <Link
                    href={isAdmin ? `/admin/contratos${formatQueryParams(details)}` : `/contratos${formatQueryParams(details)}`}
                    className={`border py-2 px-4 text-sm rounded-md font-semibold bg-white text-neutral-800 hover:bg-white/90 ease-out duration-200 ${(Object.keys(details).length === 0) && "pointer-events-none opacity-70"}`}
                  >
                    Filtrar
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ContractFilter;