"use client";

import React, { useState } from "react";
import Link from "next/link";

import RequestTokenButton from "./RequestTokenButton";
import Navbar from "./Navbar";

import { VerifyDocumentStatus } from "@/utils/VerifyDocumentStatus";
import { VerifyPaymentStatus } from "@/utils/VerifyPaymentStatus";

import { FaRegFile } from "react-icons/fa";
import { formatDate, formatPostalCode } from "@/utils/formatters";

interface SingleContractSectionProps {
  contract: TContract;
  isAdmin?: boolean;
  payments: TPayment[];
  contractUsers: TUserContract[];
}

const SingleContractSection = ({ contract, payments, contractUsers }: SingleContractSectionProps) => {

  const expirationDate = new Date(new Date(contract.start_date).setMonth(new Date(contract.start_date).getMonth() + Number(contract.duration)));

  const isSigned = contractUsers.some(cont => cont.signed_date !== null);

  type TabOptions = "details" | "payments"
  const [tab, setTab] = useState<TabOptions>("details");

  return (
    <div className="flex flex-col gap-y-10">
      <Navbar title={`Contrato de ${contract.client?.name.split(" ")[0]}`} routerBack>

        <div className="flex items-center gap-x-2">
          {!!isSigned && <Link target="_blank" href={`${contract?.url}`} className="border h-[30px] flex items-center justify-center px-3 rounded-md hover:bg-white hover:text-neutral-900 ease-out duration-200 font-medium">Visualizar Contrato</Link>}
        </div>
      </Navbar>

      <section className="flex justify-between items-stretch gap-10 border-2 p-10 rounded-md h-full">
        <div className="flex flex-col items-start justify-between w-[50%] h-full">
          <span className="text-xl font-bold mb-2">Informações do contrato:</span>
          <div className="flex items-center gap-x-2">
            <span>id:</span>
            <span>{contract.id}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span>Duração:</span>
            <span>{contract.duration} meses</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span>Expiração:</span>
            <span>{formatDate(expirationDate)}</span>
          </div>
          {contract.sign_date &&
            <div className="flex items-center gap-x-2">
              <span>Data de assinatura:</span>
              <span>{formatDate(new Date(contract.sign_date))}</span>
            </div>
          }
          <div className="flex items-center gap-x-2">
            <span>Assinado:</span>
            <span className={`${contract.sign_date ? "text-green-500" : "text-red-500"} uppercase font-medium`}>{contract.sign_date ? "Assinado" : "Não assinado"}</span>
          </div>

          {!contract.sign_date && <RequestTokenButton contract_id={contract.id} />}
        </div>

        <div className="flex flex-col items-start w-[50%]">
          <span className="text-xl font-bold mb-2">Informações do cliente:</span>
          <div className="flex items-center gap-x-2">
            <span>Nome:</span>
            <span>{contract.client.name}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span>Email:</span>
            <span>{contract.client.email}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span>Verificado:</span>
            <span className={`${contract.client.document_status === "APPROVED" ? "text-green-500" : contract.client.document_status === "REJECTED" ? "text-red-500" : "text-yellow-400"}`}>
              {VerifyDocumentStatus(contract.client.document_status as string)}
            </span>
          </div>
          <div className="flex items-start gap-x-2 mt-2">
            {contract.client.address &&
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-x-2">
                  <span>Rua:</span>
                  <span>{contract.client.address?.street},</span>
                  <span>{contract.client.address?.number}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>Cidade:</span>
                  <span>{contract.client.address?.city},</span>
                  <span>{formatPostalCode(contract.client.address?.postal_code)}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <section className="flex flex-col items-start gap-y-5 w-full">
        <div className="w-full flex items-center justify-between mb-5">
          <span className="text-3xl font-bold">Detalhes do contrato:</span>
          {payments.length > 0 &&
            <div className="flex items-center justify-between space-x-1 rounded-xl bg-neutral-500/40 p-1 font-medium text-sm" >
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
            </div>
          }
        </div>
        {tab === "details" ?
          <div className="flex flex-col items-center text-white gap-y-10 w-full">
            <div className="flex flex-col items-start w-full">
              <span className="text-2xl font-bold mb-4">Itens da proposta</span>
              <div className="flex flex-col items-start gap-y-1">
                {contract.details.propostaItens.map(item =>
                  <span className="font-medium" key={item}>• {item}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start w-full">
              <span className="text-2xl font-bold mb-4">Serviços:</span>
              <div className="flex flex-col items-start gap-y-1">
                {contract.details.servicesArray.map(item =>
                  <span className="font-medium" key={item}>• {item}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start w-full">
              <span className="text-2xl font-bold mb-4">Suporte:</span>
              <div className="flex flex-col items-start gap-y-1">
                {contract.details.niveisDeSuporte.map(item =>
                  <span className="font-medium" key={item}>• {item}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start w-full">
              <span className="text-2xl font-bold mb-4">Valores:</span>
              <table className="border-collapse w-full">
                <thead>
                  <tr className="border-b-2 text-neutral-300">
                    <th className="px-4 py-2 font-bold text-start">Serviço</th>
                    <th className="px-4 py-2 min-w-[100px] font-bold text-end">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {contract.details.valoresImplantacao.map((item) => (
                    <tr key={item.valor}>
                      <td className="border-b-[.5px] px-4 py-2">{item.servico}</td>
                      <td className="border-b-[.5px] px-4 py-2 text-end">R$ {item.valor}</td>
                    </tr>
                  ))}
                  <tr className="bg-neutral-500/40">
                    <td className="px-4 py-[10px] font-bold">Total</td>
                    <td className="px-4 py-[10px] font-bold text-end">
                      R$ {contract.details.valoresImplantacao.reduce((acc, item) => acc + item.valor, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          :
          <div className="flex flex-col items-start w-full">
            <span className="text-2xl font-bold mb-4">Pagamentos</span>
            <table className=" w-full">
              <thead>
                <tr className="border-b text-neutral-300">
                  <th className="px-4 py-2 font-bold text-start">Vencimento</th>
                  <th className="px-4 py-2 font-bold text-start">Status</th>
                  <th className="px-4 py-2 font-bold text-start">Ações</th>
                  <th className="px-4 py-2 font-bold text-end">Valor</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((pay) => (
                  <tr key={pay.id} className="h-[50px]">
                    <td className="border-b px-4 text-sm">{formatDate(new Date(pay.due_date as Date))}</td>
                    <td className="border-b px-4 text-sm">
                      <span className={`${pay.status === "PAID" ? "bg-green-400/60" : pay.status === "OVERDUE" ? "bg-red-500/60" : pay.status === "PENDING" ? "bg-yellow-500/50" : "bg-neutral-400/60"} px-6 py-2 rounded-lg font-bold`}>{VerifyPaymentStatus(pay.status)}</span>
                    </td>
                    <td className="border-b px-4 text-sm">
                      <a target="_blank" rel="noreferrer" href={pay.bank_slip} className="text-lg hover:text-blue_button ease-out duration-200 w-[20px]">
                        <FaRegFile />
                      </a>
                    </td>
                    <td className="border-b px-4 text-sm text-end">RS {pay.value},00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </section >
    </div >
  );
};

export default SingleContractSection;