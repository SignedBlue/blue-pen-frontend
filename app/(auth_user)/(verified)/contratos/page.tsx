import ContractList from "@/app/components/ContractList";
import LoadingSkeleton from "@/app/components/skeletons/LoadingSkeleton";
import { getData } from "@/utils/getData";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Contratos",
};

export default async function UserContractsPage() {
  const user_id = cookies().get("user_id")?.value;

  const contracts: ContractResponse = await getData(`/contracts?client_id=${user_id}`, {
    cache: "no-cache",
    next: {
      tags: ["contracts", "single_contract"]
    },
  });

  return (
    <Suspense fallback={<LoadingSkeleton label="Contratos" />}>
      <ContractList contracts={contracts} />
    </Suspense>
  );
}