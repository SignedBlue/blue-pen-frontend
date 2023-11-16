import { cookies } from "next/headers";

// constants
import { backendUrl } from "@/constants/Urls";
import { help_novo_contrato } from "@/constants/Helps";

// components
import NewContractForm from "./NewContractForm";
import Modal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";

export default async function NovoContratoPage() {
  const tokenValue = cookies().get("jwt")?.value;

  const users_res = await fetch(`${backendUrl}/users`, {
    headers: {
      "Authorization": `Bearer ${tokenValue}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache"
  });
  const users: DataResponse = await users_res.json();

  return (
    <div className="flex flex-col items-start">
      <Navbar title="Novo contrato" routerBack>
        <Modal title="Novo contrato" content={help_novo_contrato} />
      </Navbar>
      <NewContractForm users={users} />
    </div>
  );
}