import { Metadata } from "next";
import ContractList from "@/app/components/ContractList";
import { getData } from "@/utils/getData";
import { Suspense } from "react";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";

export const metadata: Metadata = {
  title: "Contratos",
};

export default async function ContratosPage() {
  const contracts: ContractResponse = await getData("/contracts", {
    cache: "no-cache",
    next: {
      tags: ["contracts"]
    }
  });

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ContractList isAdmin newContract contracts={contracts} />
    </Suspense>
  );
}