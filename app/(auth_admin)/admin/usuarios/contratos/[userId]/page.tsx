import ContractList from "@/app/components/ContractList";
import { backendUrl } from "@/constants/Urls";

export default async function SingleUserContracts({ params }: { params: { userId: string } }) {
  const contracts_data = await fetch(`${backendUrl}/contracts?client_id=${params.userId}`, {
    cache: "no-cache"
  });

  const contracts: ContractResponse = await contracts_data.json();

  return <ContractList routerBack contracts={contracts} />;
}