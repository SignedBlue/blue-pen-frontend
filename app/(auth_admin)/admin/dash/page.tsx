import GenericArticle from "@/app/components/GenericArticle";
import Link from "next/link";
import { Metadata } from "next";
import { getData } from "@/utils/getData";

export const metadata: Metadata = {
  title: "Home"
};

export default async function Dash() {
  const contracts: ContractResponse = await getData("/contracts", {
    cache: "no-cache"
  });

  const signedContracts = contracts.data.filter(cont => cont.sign_date !== null).length;

  return (
    <main className="h-full flex flex-col items-start">
      <h1 className="_title mb-10">Home</h1>
      <div className="flex flex-col items-start w-full">
        <div className="grid grid-cols-3 gap-5 w-full">
          <GenericArticle className="w-full">
            <div className="flex flex-col items-center gap-y-2">
              <span className="text-xl font-semibold">Total de contratos</span>
              <span className="text-2xl font-bold">{contracts.total}</span>
            </div>
          </GenericArticle>
          <GenericArticle className="w-full">
            <div className="flex flex-col items-center justify-center gap-y-2 w-full h-full">
              <span className="text-xl font-bold">Último contrato</span>
              <span className="truncate w-[200px]">{contracts.data[contracts.data.length - 1].id}</span>
              <Link href={`/admin/contratos/${contracts.data[contracts.data.length - 1].id}`} className="hover:opacity-80">Visualizar</Link>
            </div>
          </GenericArticle>
          <GenericArticle className="w-full">
            <div className="flex flex-col items-center justify-center gap-y-2 w-full h-full">
              <span className="text-xl font-bold">Contratos assinados</span>
              <span className="">{signedContracts}</span>
              <Link href={"/admin/contratos?sign_status=signed"} className="hover:opacity-80">Visualizar</Link>
            </div>
          </GenericArticle>
        </div>
      </div>
    </main>
  );

}