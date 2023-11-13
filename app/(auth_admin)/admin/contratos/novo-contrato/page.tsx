import RouterBackButton from "@/app/components/RouterBackButton";
import NewContractForm from "./NewContractForm";
import { backendUrl } from "@/constants/Urls";
import { cookies } from "next/headers";
import Modal from "@/app/components/Modal";
import { help_novo_contrato } from "@/constants/Helps";

export default async function NovoContratoPage() {
  const tokenValue = cookies().get("jwt")?.value;

  const users_res = await fetch(`${backendUrl}/users`, {
    headers: {
      "Authorization": `Bearer ${tokenValue}`,
      "Content-Type": "application/json",
    },
    cache: "no-store"
  });
  const users: DataResponse = await users_res.json();

  return (
    <div className="flex flex-col items-start">
      <nav className="flex items-center gap-x-4 mb-10">
        <RouterBackButton />
        <span className="_title mb-0">Novo contrato</span>
        <Modal title="Novo contrato" content={help_novo_contrato} />
      </nav>
      <NewContractForm users={users} />
    </div>
  );
}