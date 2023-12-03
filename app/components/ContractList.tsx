"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { BsGrid } from "react-icons/bs";
import { TfiViewList } from "react-icons/tfi";

import { useAuthContext } from "@/providers/AuthProvider";
import { help_contratos } from "@/constants/Helps";

import ContractArticle from "./ContractArticle";
import ContractFilter from "./ContractFilter";
import Modal from "./Modal";
import Navbar from "./Navbar";
import RouterBackButton from "./RouterBackButton";

interface ContractListProps {
  contracts: ContractResponse;
  isAdmin?: boolean;
  routerBack?: boolean;
  newContract?: boolean;
  showFilter?: boolean;
}

const ContractList = ({ contracts, isAdmin = false, routerBack = false, newContract = false, showFilter = true }: ContractListProps) => {
  const { display, setDisplay } = useAuthContext();

  type Rule = (item: TContract) => boolean;
  const rules: Rule[] = [];

  // duração
  const duration_params = useSearchParams().get("duration") || "";
  if (duration_params) {
    rules.push((item) => item.duration <= Number(duration_params));
  }

  // nome do cliente
  const name_params = useSearchParams().get("client_name") || "";
  if (name_params) {
    rules.push(item => item.client.name.toLowerCase().includes(name_params.toLowerCase()));
  }

  // data de vencimento próxima
  const near_expiration_params = useSearchParams().get("near_expiration") || "";
  const ruleNearExpiration = (item: TContract) => {
    const currentDate = new Date();
    const limitDate = new Date();
    limitDate.setMonth(limitDate.getMonth() + 1);

    if (item.termination_date) {
      const terminationDate = new Date(item.termination_date);
      return terminationDate > currentDate && terminationDate <= limitDate;
    }
    return false;
  };

  if (near_expiration_params) {
    rules.push(ruleNearExpiration);
  }

  const sign_status_params = useSearchParams().get("sign_status") || "";
  if (sign_status_params === "signed") {
    rules.push(item => item.sign_date !== null);
  } else if (sign_status_params === "unsigned") {
    rules.push(item => item.sign_date == null);
  }

  const termination_date_params = useSearchParams().get("expired") || "";
  if (termination_date_params === "true") {
    rules.push(item => item.termination_date !== null);
  }

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
          <Link href={"/admin/contratos/novo-contrato"} className="border py-1 px-3 rounded-md hover:bg-white hover:text-dark_bg ease-out duration-200 font-medium">
            Novo Contrato
          </Link>
        }

        {showFilter && <ContractFilter isAdmin={isAdmin} />}

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

      <div className={`${display === "grid" && filteredContracts.length > 0
        ? "flex flex-col md:grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        : "flex flex-col"
        } gap-5 w-full`}
      >
        {filteredContracts.length > 0 ? (
          filteredContracts.map((cont) => (
            <ContractArticle
              key={cont.id}
              href={isAdmin ? "/admin/contratos" : "/contratos"}
              contract={cont}
              display={display}
            />
          ))
        ) : (
          <span>Nenhum contrato encontrado</span>
        )}
      </div>

    </>
  );
};

export default ContractList;