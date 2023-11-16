import { Metadata } from "next";
import ContractList from "@/app/components/ContractList";
import { getData } from "@/utils/getData";

export const metadata: Metadata = {
  title: "Contratos",
};

export default async function ContratosPage() {
  const contracts: ContractResponse = await getData("/contracts");

  return <ContractList isAdmin newContract contracts={contracts} />;
}