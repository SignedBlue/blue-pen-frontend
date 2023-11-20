import GenericArticle from "@/app/components/GenericArticle";
import { getData } from "@/utils/getData";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Home"
};
export default async function HomePageUser() {
  const user_id = cookies().get("user_id")?.value;
  const contracts: ContractResponse = await getData(`/contracts?client_id=${user_id}`, {
    cache: "no-cache",
    next: {
      tags: ["contracts"]
    },
  });

  return (
    <div className="h-full flex flex-col items-start">
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
              {contracts?.data?.length > 0 ? (
                <>
                  <span className="truncate w-[200px]">{contracts.data[contracts?.data.length - 1].id}</span>
                  <Link href={`/contratos/${contracts.data[contracts?.data?.length - 1].id}`} className="hover:opacity-80">Visualizar</Link>
                </>
              ) : null}
            </div>
          </GenericArticle>
        </div>
      </div>
    </div>
  );
}