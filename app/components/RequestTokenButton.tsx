"use client";

import { useState } from "react";
import { SignContract, RequestToken } from "../actions/_contract";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";

interface RequestTokenButtonProps {
  contract_id: string;
  document_status?: TDocumentStatus;
}
const RequestTokenButton = ({ contract_id, document_status }: RequestTokenButtonProps) => {

  const [tokenSended, setTokenSended] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenValue, setTokenValue] = useState<string>("");

  const request = async (id: string) => {
    setLoading(true);
    await RequestToken(id)
      .then(() => {
        toast.success("Enviamos um token para seu email", {
          style: {
            padding: "12px",
          },
        });
        setTokenSended(true);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Falha ao enviar token..", {
          style: {
            padding: "12px",
          },
        });
        setLoading(false);
      });
  };

  const sign = async ({ token, contract_id }: { token: string; contract_id: string }) => {
    setLoading(true);
    await SignContract({ contract_id, token })
      .then(() => {
        toast.success("Contrato assinado com sucesso", {
          style: {
            padding: "12px",
          },
        });
        setTokenSended(true);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Erro ao assinar contrato", {
          style: {
            padding: "12px",
          },
        });
        setLoading(false);
      });
  };

  if (document_status !== "APPROVED") {
    return (
      <div className="w-full h-[80px] bg-neutral-500 ease-out duration-200 text-white text-center rounded-md p-3 mt-2">
        Desculpe, você <b className="font-semibold">não pode</b> assinar o contrato, pois seus documentos não foram aprovados.
      </div>
    );
  }

  if (!tokenSended) {
    return (
      <button onClick={() => request(contract_id)} className="w-full h-[50px] bg-blue_button ease-out duration-200 text-white text-center rounded-md p-3 mt-2 flex justify-center items-center hover:bg-opacity-80">
        {loading ? <ReactLoading
          width={40}
          height={40}
          color="#fff"
          type="cylon"
        /> :
          "Gerar token para assinatura"
        }
      </button>
    );
  }

  return (
    <div className="flex flex-col items-start mt-2 w-full">
      <input
        type="text"
        name="token"
        id="token"
        onChange={(e) => setTokenValue(e.target.value)}
        placeholder="Cole seu token aqui"
        className="w-[60%] outline-none rounded-md h-[30px] text-black placeholder:text-gray-400 text-center"
      />
      <button
        onClick={() => sign({ token: tokenValue, contract_id: contract_id })}
        className="w-[60%] h-[50px] bg-blue_button ease-out duration-200 text-white text-center rounded-md p-3 mt-2 flex justify-center items-center hover:bg-opacity-80">
        {loading ? <ReactLoading
          width={40}
          height={40}
          color="#fff"
          type="cylon"
        /> :
          "Assinar contrato"
        }
      </button>
    </div>
  );
};

export default RequestTokenButton;