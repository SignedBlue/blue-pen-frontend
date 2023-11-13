import { FormatDate } from "@/utils/FormateDate";
import Link from "next/link";

interface ContractArticleProps {
  contract: TContract
  display: string;
  href: string;
}
const ContractArticle = ({
  contract,
  display,
  href
}: ContractArticleProps) => {
  const expirationDate = new Date(new Date(contract.start_date).setMonth(new Date(contract.start_date).getMonth() + Number(contract.duration)));

  return (
    <Link href={`${href}/${contract.id}`} className={`${display === "grid" ? "flex-col min-h-[150px]" : " justify-between"} scroll-m-0 flex items-center rounded-md p-3 relative shadow-md w-full bg-neutral-400 border-b-2 border-transparent hover:shadow-lg hover:bg-neutral-400/70 hover:border-b-white ease-out duration-100`}>
      <span className={`font-semibold ${display === "grid" && "mb-2 text-center"} w-[200px] truncate text-lg`}>{contract.id}</span>
      <span className="w-[200px] truncate">{contract?.hash}</span>
      <span className="uppercase text-sm">{contract.sign_date ? "Assinado" : "Não assinado"}</span>
      <span>{FormatDate(expirationDate)}</span>
    </Link>
  );
};

export default ContractArticle;