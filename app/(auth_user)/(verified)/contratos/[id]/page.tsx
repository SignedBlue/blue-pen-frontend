import { notFound } from "next/navigation";
import { Metadata } from "next";
import SingleContractSection from "@/app/components/SingleContractSection";
import { getData } from "@/utils/getData";

export async function generateMetadata({ params: { id: contractId } }: { params: { id: string } }): Promise<Metadata> {
  const contract: TContract = await getData(`/contracts/${contractId}`, { cache: "no-cache" });

  return {
    title: !!contract && `Contrato de ${contract.client.name.split(" ")[0]}`
  };
}

export default async function SingleContract({ params: { id: contractId } }: { params: { id: string } }) {
  const contractPromise = getData(`/contracts/${contractId}`,
    {
      cache: "no-cache",
      next: {
        tags: ["single_contract"]
      }
    },
  ) as Promise<TContract>;

  const paymentsPromise = getData(`/payments?contract_id=${contractId}`,
    {
      cache: "no-cache",
      next: {
        tags: ["payments"]
      }
    },
  ) as Promise<IPaymentResponse>;

  const contractUsersPromise = getData(`/contract-users?contract_id=${contractId}`, { cache: "no-cache" }) as Promise<IUserContract>;

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