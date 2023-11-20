import Link from "next/link";
import {
  calculateExpirationDate,
  formatDate
} from "@/utils/formatters";

interface ContractArticleProps {
  contract: TContract
  display: string;
  href: string;
}
const ContractArticle = ({ contract, display, href }: ContractArticleProps) => {

  const expirationDate = calculateExpirationDate(contract.start_date, contract.duration);

  return (
    <Link href={`${href}/${contract.id}`} className={`${display === "grid" ? "flex-col min-h-[150px] p-5" : " justify-between items-center p-3"} scroll-m-0 flex rounded-md relative shadow-md w-full bg-gradient-to-b from-neutral-300/40 to-neutral-500/100 border-b-2 border-transparent hover:shadow-lg hover:bg-neutral-400/50 hover:border-b-white`}>
      <span className={`font-semibold ${display === "grid" && "mb-2 min-h-[40px]"} text-lg`}>Contrato de {contract.client.name.split(" ")[0] || "nome cliente"}</span>
      <span className="uppercase font-semibold text-sm">{contract.sign_date ? "Assinado" : "Não assinado"}</span>
      <span>{formatDate(expirationDate)}</span>
    </Link>
  );
};

export default ContractArticle;