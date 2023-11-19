"use client";

import React, { useState } from "react";

// libs
import ReactLoading from "react-loading";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// actions
import { CreateContract } from "@/app/actions/_contract";

// schemas
import { NewContractSchema } from "@/schemas/Contract";

interface NewContractFormProps {
  users?: DataResponse;
}

type TInputs = z.infer<typeof NewContractSchema>
const NewContractForm = ({ users }: NewContractFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TInputs>({
    resolver: zodResolver(NewContractSchema)
  });

  // items proposta
  const [propostaItens, setPropostaItens] = useState<string[]>([
    // "Implantar um servidor Windows Server 2019 que ficará com a função de servidor de armazenamento de arquivos, possuindo controle de acessos na rede com senha para cada usuário gerenciando a rede de forma mais complexa;",
    // "Implantar um Mikrotik com função de failover de internet, caso o link principal sofra uma falha ou interrompendo do serviço, o aparelho realiza a troca do link de forma automática. Mantendo a conexão e acesso à internet, estável;",
  ]);

  const [newPropostaItem, setNewPropostaItem] = useState<string>("");

  const addNewPropostaItem = () => {
    if (newPropostaItem.trim() !== "") {
      setPropostaItens([...propostaItens, newPropostaItem]);
      setNewPropostaItem("");
    }
  };

  // items servico
  const [servicoItens, setServicoItens] = useState<string[]>([
    // "Manutenção em Máquinas Windows.",
    // "Manutenção em Servidores Windows.",
    // "Manutenção em Backup de Servidores e Máquinas.",
    // "Backup em nuvem utilizando serviço em nuvem.",
    // "Monitoramento da rede com Pandora e RDPGuard.",
    // "Proteção de infraestrutura.",
    // "Terminal Service – Permite o acesso de cliente/estações remotas para uso do recurso da Rede Local.",
    // "Serviço de AD (Active Directory) – Segurança completa conforme a LGPD(Lei de Proteção dos Dados).",
    // "Configuração de hardware (impressoras, scanner, wireless)."
  ]);

  const [newServicoItem, setNewServicoItem] = useState<string>("");

  const addNewServicoItem = () => {
    if (newServicoItem.trim() !== "") {
      setServicoItens([...servicoItens, newServicoItem]);
      setNewServicoItem("");
    }
  };

  // niveis de suporte
  const [suporteItens, setSuporteItens] = useState<string[]>([
    // "Realização de manutenção preventiva e corretiva no hardware e software dos computadores e servidores do cliente.",
    // "Utilização Pandora para monitorar o servidor e a rede, para que nos alerte qualquer tipo de anormalidade que possa estar ocorrendo.",
    // "Utilização RdpGuard para prevenção contra ramsoware e possíveis ataques na rede."
  ]);

  const [newSuporteItem, setNewSuporteItem] = useState<string>("");

  const addNewSuporteItem = () => {
    if (newSuporteItem.trim() !== "") {
      setSuporteItens([...suporteItens, newSuporteItem]);
      setNewSuporteItem("");
    }
  };

  // formas de atendimento
  const formasDeAtendimento: string[] = [
    "Atendimento Telefônico (móvel): 08:00 às 18:00 (seg à sex) – 09:00 às 12:00 (sábado) exclusivo para clientes com contrato de suporte mensal.",
    "Atendimento remoto: Imediato, após contato telefônico, ou por iniciativa de nossos técnicos caso seja observada a necessidade de alguma atualização de emergência.",
    "Atendimento Presencial: Caso a solução dos problemas não possa ser realizada remotamente o técnico vai até o local."
  ];

  // valores
  const [valoresImplantacao, setValoresImplantacao] = useState<{ servico: string; valor: number }[]>([
    // { "servico": "Formatação e Configuração Windows Server 2019", "valor": 1000 },
    // { "servico": "Configuração Failover de Internet + Mikrotik", "valor": 800 },
    // { "servico": "Configuração Backup’s", "valor": 500 }
  ]);
  const totalSum = valoresImplantacao.reduce((acc, item) => acc + item.valor, 0);

  const [newServicoImplantacao, setNewServicoImplantacao] = useState<string>("");
  const [newValorImplantacao, setNewValorImplantacao] = useState<number | undefined>(undefined);

  const addNewImplantacao = () => {
    if (newServicoImplantacao.trim() !== "" && newValorImplantacao !== undefined) {
      setValoresImplantacao([
        ...valoresImplantacao,
        { servico: newServicoImplantacao, valor: newValorImplantacao },
      ]);
      setNewServicoImplantacao("");
      setNewValorImplantacao(undefined);
    }
  };

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const newContract: INewContract = {
      client_id: data.client_id,
      duration: Number(data.duration),
      created_at: new Date(),
      updated_at: new Date(),
      start_date: data.start_date,
      metadata: {
        origin: "WEB"
      },
      details: {
        formasDeAtendimento: formasDeAtendimento,
        niveisDeSuporte: suporteItens,
        propostaItens: propostaItens,
        servicesArray: servicoItens,
        valoresImplantacao: valoresImplantacao
      }
    };

    await CreateContract(newContract);
  };

  return (
    <section className="flex items-stretch justify-between gap-x-5 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-3 w-[50%]">
        <div className="flex items-center gap-x-3 w-full">
          <textarea
            placeholder="Item da proposta"
            rows={2}
            style={{ resize: "none" }}
            value={newPropostaItem}
            onChange={(e) => setNewPropostaItem(e.target.value)}
            className={"rounded-md p-2 w-full text-black outline-none"}
          />
          <button
            type="button"
            disabled={newPropostaItem === ""}
            className={`border-2 w-[40px] h-[40px] min-w-[40px] text-2xl rounded-md border-white ease-out duration-200 ${newPropostaItem === "" ? "opacity-70" : "hover:bg-white hover:text-dark_bg"}`}
            onClick={addNewPropostaItem}
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-x-3 w-full">
          <textarea
            placeholder="Serviço"
            rows={2}
            style={{ resize: "none" }}
            value={newServicoItem}
            onChange={(e) => setNewServicoItem(e.target.value)}
            className={"rounded-md p-2 w-full text-black outline-none"}
          />
          <button
            type="button"
            disabled={newServicoItem === ""}
            className={`border-2 w-[40px] h-[40px] min-w-[40px] text-2xl rounded-md border-white ease-out duration-200 ${newServicoItem === "" ? "opacity-70" : "hover:bg-white hover:text-dark_bg"}`}
            onClick={addNewServicoItem}
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-x-3 w-full">
          <textarea
            placeholder="Nível de suporte"
            rows={2}
            style={{ resize: "none" }}
            value={newSuporteItem}
            onChange={(e) => setNewSuporteItem(e.target.value)}
            className={"rounded-md p-2 w-full text-black outline-none"}
          />
          <button
            type="button"
            disabled={newSuporteItem === ""}
            className={`border-2 w-[40px] h-[40px] min-w-[40px] text-2xl rounded-md border-white ease-out duration-200 ${newSuporteItem === "" ? "opacity-70" : "hover:bg-white hover:text-dark_bg"}`}
            onClick={addNewSuporteItem}
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-x-3 w-full">
          <input
            type="text"
            placeholder="Serviço"
            value={newServicoImplantacao}
            onChange={(e) => setNewServicoImplantacao(e.target.value)}
            className={"rounded-md p-2 w-full text-black outline-none"}
          />
          <input
            type="number"
            placeholder="Valor"
            value={newValorImplantacao || ""}
            onChange={(e) => setNewValorImplantacao(parseFloat(e.target.value))}
            className={"rounded-md p-2 w-full text-black outline-none"}
          />
          <button
            type="button"
            disabled={newServicoImplantacao === "" || newValorImplantacao === null}
            className={`border-2 w-[40px] h-[40px] min-w-[40px] text-2xl rounded-md border-white ease-out duration-200 ${newServicoImplantacao === "" || newValorImplantacao === null ? "opacity-70" : "hover:bg-white hover:text-dark_bg"}`}
            onClick={addNewImplantacao}
          >
            +
          </button>
        </div>

        <div className="flex items-center w-full">
          <label htmlFor="client_id" className="mr-2 min-w-[200px]">
            Cliente relacionado:
          </label>
          <select {...register("client_id")} className="rounded-md p-1 text-black w-full h-[40px] outline-none">
            <option value="" disabled selected>
              Selecione um cliente
            </option>
            {users?.data.filter((user) => user.user_type === null || user.user_type === "client" && user.verified).map((user) => (
              <option key={user.id} value={user.id} className="outline-none">
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center w-full">
          <label htmlFor="start_date" className="mr-2 min-w-[200px]">
            Data de início:
          </label>
          <input
            id="start_date"
            type="date"
            {...register("start_date")}
            placeholder="Data de início"
            className={`rounded-md p-2 w-full text-black outline-none ${errors.start_date && "border-red-500"}`}
          />
        </div>
        {errors.start_date?.message}
        <input
          type="text"
          {...register("duration")}
          placeholder="Duração (meses)"
          className={`rounded-md p-2 w-full text-black outline-none ${errors.duration && "border-red-500"}`}
        />
        {errors.duration?.message}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[50px] bg-blue_button ease-out duration-200 text-white text-center rounded-md p-3 mt-4 flex justify-center items-center hover:bg-opacity-80"
        >
          {isSubmitting ? <ReactLoading
            width={40}
            height={40}
            color="#fff"
            type="bars"
          /> : "Criar contrato"}
        </button>
      </form>

      <div className="flex flex-col items-center bg-white rounded-md w-[50%] h-[400px] p-5 gap-y-5 overflow-y-scroll">
        <div className="flex flex-col items-start w-full">
          <span className="text-2xl font-bold text-black mb-2">Itens da proposta</span>
          <div className="flex flex-col items-start gap-y-1">
            {propostaItens.map(item =>
              <span className="text-neutral-500 font-medium" key={item}>• {item}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <span className="text-xl font-bold text-black mb-4">Serviços:</span>
          <div className="flex flex-col items-start gap-y-1">
            {servicoItens.map(item =>
              <span className="text-neutral-500 font-medium" key={item}>• {item}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <span className="text-xl font-bold text-black mb-4">Suporte:</span>
          <div className="flex flex-col items-start gap-y-1">
            {suporteItens.map(item =>
              <span className="text-neutral-500 font-medium" key={item}>• {item}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <span className="text-xl font-bold text-black mb-4">Valores:</span>
          <table className="border-collapse border w-full rounded-md">
            <thead>
              <tr>
                <th className="border px-4 py-2 min-w-[180px] text-black font-bold text-start">Serviço</th>
                <th className="border px-4 py-2 min-w-[130px] text-black font-bold text-end">Valor</th>
              </tr>
            </thead>
            <tbody>
              {valoresImplantacao.map((item) => (
                <tr key={item.valor}>
                  <td className="border px-4 py-2 text-neutral-500">{item.servico}</td>
                  <td className="border px-4 py-2 text-neutral-500 text-end">R$ {item.valor}</td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2 text-black font-bold">Total</td>
                <td className="border px-4 py-2 text-black font-bold text-end">R$ {totalSum}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default NewContractForm;