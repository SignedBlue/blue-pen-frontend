import { backendUrl } from "@/constants/Urls";
import { VerifyDocumentStatus } from "@/utils/VerifyDocumentStatus";
import { cookies } from "next/headers";

export default async function Etapa2Page() {
  const user_id = cookies().get("user_id")?.value;
  const res = await fetch(`${backendUrl}/users/account/${user_id}`, {
    cache: "no-cache"
  });

  const resData: AsaasResponse = await res.json();
  const data = resData.data[0];

  return (
    <section className="flex flex-col items-center rounded-lg p-4 mb-4">
      <p className="text-center mb-5 text-xl text-white">
        Agora que a sua conta na
        <a href="https://www.asaas.com/" target="_blank" rel="noreferrer" className="bg-gradient-to-r text-transparent from-[#9dbff8] to-[#3686f1] bg-clip-text hover:opacity-70 ease-out duration-200 font-bold"> ASAAS </a>
        foi criada precisamos validar sua identidade enviando alguns dos documentos abaixo
      </p>
      <div className="flex flex-col items-center my-3">
        <h2 className="text-xl font-semibold">{data.title}</h2>
        <p>{data.description}</p>
        <p className="flex items-center gap-x-4">
          Status:
          <span className={`${data.status === "APPROVED" ? "text-green-500" : data.status === "REJECTED" ? "text-red-500" : "text-yellow-400"}`}>
            {VerifyDocumentStatus(data.status)}
          </span>
        </p>
        <p>Responsável: {data.responsible.name}</p>

      </div>
      <a href={data?.onboardingUrl ?? "https://www.caf.io/"} target="_blank" rel="noreferrer">{data?.onboardingUrl ? data.onboardingUrl : "Link para envio de documentos"}</a>
    </section>
  );
}