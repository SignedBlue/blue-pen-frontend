import { notFound } from "next/navigation";
import { Metadata } from "next";
import { backendUrl } from "@/constants/Urls";
import SingleContractSection from "@/app/components/SingleContractSection";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const data = await fetch(`${backendUrl}/contracts/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const contract: TContract = await data.json();

  return {
    title: !!contract && `Contrato de ${contract.client.name.split(" ")[0]}`
  };
}

export default async function SingleContract({ params: { id: contractId } }: { params: { id: string } }) {
  const contractPromise = fetch(`${backendUrl}/contracts/${contractId}`, { cache: "no-cache" })
    .then((response) => response.json()) as Promise<TContract>;

  const paymentsPromise = fetch(`${backendUrl}/payments?contract_id=${contractId}`, { cache: "no-cache" })
    .then((response) => response.json()) as Promise<IPaymentResponse>;

  const contractUsersPromise = fetch(`${backendUrl}/contract-users?contract_id=${contractId}`, { cache: "no-cache" })
    .then((response) => response.json() as Promise<IUserContract>);

  const [contract, payments, contract_users] = await Promise.all([
    contractPromise,
    paymentsPromise,
    contractUsersPromise,
  ]);


  if (!contract) {
    return notFound();
  }

  return <SingleContractSection contract={contract} payments={payments.data} contractUsers={contract_users.data} />;
}