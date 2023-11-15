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
  const user_data = await fetch(`${backendUrl}/users/${contract.client_id}`);
  const user: TUserData = await user_data.json();

  return {
    title: !!contract && `Contrato de ${user.name}`
  };
}

export default async function SingleContract({ params: { id: contractId } }: { params: { id: string } }) {
  const contract_data = await fetch(`${backendUrl}/contracts/${contractId}`, {
    cache: "no-cache"
  });
  const contract: TContract = await contract_data.json();

  const payments_data = await fetch(`${backendUrl}/payments?contract_id=${contractId}`, {
    cache: "no-cache"
  });
  const payments: IPaymentResponse = await payments_data.json();

  const user_data = await fetch(`${backendUrl}/users/${contract.client_id}`);
  const user: TUserData = await user_data.json();


  if (!contract) {
    return notFound();
  }

  return <SingleContractSection contract={contract} user={user} payments={payments.data} />;
}