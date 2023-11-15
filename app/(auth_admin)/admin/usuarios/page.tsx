import { backendUrl } from "@/constants/Urls";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function InfosPage() {
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
    <div className="flex flex-col gap-y-2 items-start">
      <span className="_title">Clientes</span>
      <span className="mb-10 text-sm">Clique para filtrar os contratos por clientes.</span>

      <div className="grid grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
        {users?.data.filter((user) => user.user_type === null || user.user_type === "user").map((user) =>
          <Link href={`/admin/usuarios/contratos/${user.id}`} key={user.id} className="flex flex-col items-center justify-center h-full gap-y-1 w-full min-w-[250px] min-h-[150px] bg-gradient-to-b from-neutral-300/40 to-neutral-500/100 rounded-[10px] p-4 ease-out duration-200">
            <p className="text-xl font-bold border-b w-full text-center mb-2">{user.name}</p>
            <span className="text-sm">{user.email}</span>
            <span className="text-sm">{user.phone}</span>
            <span className="text-sm">{user.verified ? "Verificado" : "Não verificado"}</span>
          </Link>
        )}
      </div>
    </div>);
}