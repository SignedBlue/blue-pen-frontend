"use client";

import React from "react";
import ContractArticle from "./ContractArticle";
import { BsGrid } from "react-icons/bs";
import { TfiViewList } from "react-icons/tfi";
import { useAuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import RouterBackButton from "./RouterBackButton";
import Modal from "./Modal";
import { help_contratos } from "@/constants/Helps";
import Navbar from "./Navbar";
import { useSearchParams } from "next/navigation";
import ContractFilter from "./ContractFilter";

interface ContractListProps {
  contracts: ContractResponse;
  isAdmin?: boolean;
  routerBack?: boolean;
  newContract?: boolean;
}

const ContractList = ({ contracts, isAdmin = false, routerBack = false, newContract = false }: ContractListProps) => {
  const { display, setDisplay } = useAuthContext();

  const duration = useSearchParams().get("duration") || "";
  type Rule = (item: TContract) => boolean;
  const rules: Rule[] = [];

  // Regra de filtro para duração se duration existir nos parâmetros de pesquisa
  if (duration) {
    rules.push((item) => item.duration <= Number(duration));
  }

  // Outras regras de filtro podem ser adicionadas conforme necessário
  // rules.push(item => item.client_id === "6254fab0-3c2a-4583-aea0-9ce9a7575b83");
  // rules.push(item => new Date(item.created_at) > new Date("2023-05-13"));

  const filteredContracts = contracts?.data.filter((item) => {
    return rules.every((rule) => rule(item));
  });

  if (contracts.total === 0) {
    return (
      <nav className="hidden md:flex flex-col items-start justify-between w-full">
        <div className="flex items-center gap-x-4 mb-10">
          {routerBack && <RouterBackButton />}
          <span className="_title mb-0">Contratos</span>
        </div>
        <span>Você não possui contratos ativos no momento.</span>
      </nav>
    );
  }

  return (
    <>
      <Navbar title="Contratos" routerBack={routerBack}>
        <Modal title="Contratos" content={help_contratos} />
        {!!newContract &&
          <Link href={"/admin/contratos/novo-contrato"} className="border py-1 px-3 rounded-md hover:bg-white hover:text-neutral-500 ease-out duration-200 font-medium">
            Novo Contrato
          </Link>
        }
        <ContractFilter />
        <div className="flex items-center">
          <button
            onClick={() => setDisplay("grid")}
            className={`${display === "grid" ? "bg-white text-neutral-700" : "text-white"} border border-white w-[25px] h-[25px] flex items-center justify-center rounded-l-md group`}
          >
            <i className={`${display !== "grid" ? "group-hover:text-neutral-400 ease-out duration-200" : "cursor-default"}`}><BsGrid /></i>
          </button>
          <button
            onClick={() => setDisplay("column")}
            className={`${display === "column" ? "bg-white text-neutral-700" : "text-white"} border border-white w-[25px] h-[25px] flex items-center justify-center rounded-r-md group`}
          >
            <i className={`${display !== "column" ? "group-hover:text-neutral-400 ease-out duration-200" : "cursor-default"}`}><TfiViewList /></i>
          </button>
        </div>
      </Navbar>

      <div className={`${display === "grid" ? "flex flex-col md:grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : "flex flex-col"} gap-5 w-full`}>
        {filteredContracts.map((cont) =>
          <ContractArticle
            key={cont.id}
            href={isAdmin ? "/admin/contratos" : "/contratos"}
            contract={cont}
            display={display}
          />
        )}
      </div>
    </>
  );
};

export default ContractList;