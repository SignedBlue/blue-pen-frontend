import { cookies } from "next/headers";

// constants
import { help_novo_contrato } from "@/constants/Helps";
import { CookiesValues } from "@/constants/Cookies";

// components
import NewContractForm from "./NewContractForm";
import Modal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";

// getData
import { getData } from "@/utils/getData";
import { redirect } from "next/navigation";

export default async function NovoContratoPage() {
  const tokenValue = cookies().get("jwt")?.value;
  const isAdmin = cookies().get(CookiesValues.name);

  const users: DataResponse = await getData("/users", {
    headers: {
      "Authorization": `Bearer ${tokenValue}`,
    },
    cache: "no-cache"
  });

  if (isAdmin?.value !== CookiesValues.admin) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col items-start">
      <Navbar title="Novo contrato" routerBack>
        <Modal title="Novo contrato" content={help_novo_contrato} />
      </Navbar>
      <NewContractForm users={users} />
    </div>
  );
}