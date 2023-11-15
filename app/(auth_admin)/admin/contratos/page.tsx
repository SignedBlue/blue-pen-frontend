import { Metadata } from "next";
import { backendUrl } from "@/constants/Urls";
import ContractList from "@/app/components/ContractList";

export const metadata: Metadata = {
  title: "Contratos",
};

export default async function ContratosPage() {
  const res = await fetch(`${backendUrl}/contracts`, {
    next: {
      tags: ["contracts"]
    },
    cache: "no-cache"
  });


  const contracts: ContractResponse = await res.json();

  return <ContractList isAdmin contracts={contracts} />;
}