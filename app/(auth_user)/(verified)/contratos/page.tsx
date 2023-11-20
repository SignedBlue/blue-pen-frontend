import ContractList from "@/app/components/ContractList";
import { backendUrl } from "@/constants/Urls";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Contratos",
};

export default async function UserContractsPage() {
  const user_id = cookies().get("user_id")?.value;
  const res = await fetch(`${backendUrl}/contracts?client_id=${user_id}`, {
    next: {
      tags: ["contracts"]
    },
    cache: "no-cache"
  });

  const contracts: ContractResponse = await res.json();

  return <ContractList contracts={contracts} />;
}