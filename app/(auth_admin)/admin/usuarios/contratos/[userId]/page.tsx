import ContractList from "@/app/components/ContractList";
import { getData } from "@/utils/getData";

export default async function SingleUserContracts({ params }: { params: { userId: string } }) {

  const contracts: ContractResponse = await getData(`/contracts?client_id=${params.userId}`);

  return <ContractList isAdmin routerBack showFilter={false} contracts={contracts} />;
}