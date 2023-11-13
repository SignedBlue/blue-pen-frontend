import RouterBackButton from "@/app/components/RouterBackButton";
import { backendUrl } from "@/constants/Urls";

export default async function VisualizationContractPage({ params }: { params: { id: string } }) {
  const data = await fetch(`${backendUrl}/contracts/file/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const contract: TContract = await data.json();
  return (
    <div className="flex flex-col items-start gap-y-2">
      <RouterBackButton />
      <pre>{JSON.stringify(contract, null, 2)}</pre>
    </div>
  );
}