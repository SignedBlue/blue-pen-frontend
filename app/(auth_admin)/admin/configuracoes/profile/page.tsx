import { backendUrl } from "@/constants/Urls";
import { cookies } from "next/headers";

export default async function ConfigProfilePage() {
  const tokenValue = cookies().get("jwt")?.value;

  const data = await fetch(`${backendUrl}/users`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${tokenValue}`,
      "Content-Type": "application/json",
    },
    cache: "no-store"
  });

  const res = await data.json();

  return (
    <div className="w-full">
      <pre className="whitespace-pre-wrap">{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
}