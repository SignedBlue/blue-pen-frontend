import React from "react";
import RouterBackButton from "./RouterBackButton";
import Link from "next/link";
import { VerifyDocumentStatus } from "@/utils/VerifyDocumentStatus";
import RequestTokenButton from "./RequestTokenButton";
import { FormatDate } from "@/utils/FormateDate";

interface SingleContractSectionProps {
  contract: TContract;
  user: UserData;
  isAdmin?: boolean;
}

const SingleContractSection = ({
  contract,
  user,
}: SingleContractSectionProps) => {

  const expirationDate = new Date(new Date(contract.start_date).setMonth(new Date(contract.start_date).getMonth() + Number(contract.duration)));

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex items-center justify-between w-full mb-10">
        <div className="flex items-center gap-x-4">
          <RouterBackButton />
          <span className="_title text-3xl mb-0">{contract.id}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <Link target="_blank" href={`${contract?.url}`} className="border h-[30px] flex items-center justify-center px-3 rounded-md hover:bg-white hover:text-neutral-400 ease-out duration-200">Visualizar Contrato</Link>
        </div>
      </div>

      <section className="flex justify-between items-stretch gap-10 border-2 p-10 rounded-md h-full">
        <div className="flex flex-col items-start justify-between w-[50%] h-full">
          <span className="text-xl font-bold mb-2">Informacoes do contrato:</span>
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
            <span>{FormatDate(expirationDate)}</span>
          </div>
          {contract.sign_date &&
            <div className="flex items-center gap-x-2">
              <span>Data de assinatura:</span>
              <span>{contract.sign_date}</span>
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
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span>Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span>Verificado:</span>
            <span className={`${user.document_status === "APPROVED" ? "text-green-500" : user.document_status === "REJECTED" ? "text-red-500" : "text-yellow-400"}`}>{VerifyDocumentStatus(user.document_status as string)}</span>
          </div>
          <div className="flex items-start gap-x-2 mt-2">
            {user.address &&
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-x-2">
                  <span>Rua:</span>
                  <span>{user.address?.street},</span>
                  <span>{user.address?.number}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>Cidade:</span>
                  <span>{user.address?.city},</span>
                  <span>{user.address?.postal_code}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <section className="flex flex-col items-start gap-y-5 w-full">
        <span className="text-3xl font-bold">Detalhes do contrato:</span>

        <div className="flex flex-col items-center text-white gap-y-10 w-full">
          <div className="flex flex-col items-start w-full">
            <span className="text-2xl font-bold mb-4">Items da proposta</span>
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
                <tr>
                  <th className="border px-4 py-2 font-bold text-start">Serviço</th>
                  <th className="border px-4 py-2 min-w-[100px] font-bold text-start">Valor</th>
                </tr>
              </thead>
              <tbody>
                {contract.details.valoresImplantacao.map((item) => (
                  <tr key={item.valor}>
                    <td className="border px-4 py-2">{item.servico}</td>
                    <td className="border px-4 py-2">R$ {item.valor}</td>
                  </tr>
                ))}
                {/* Add the total row */}
                <tr>
                  <td className="border px-4 py-2 font-bold">Total</td>
                  <td className="border px-4 py-2 font-bold">
                    R$ {contract.details.valoresImplantacao.reduce((acc, item) => acc + item.valor, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleContractSection;