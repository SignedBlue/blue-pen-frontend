import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-start text-white">
      <p className="_title">Melhore o processo de <b className="bg-gradient-to-r text-transparent from-[#9dbff8] to-[#3686f1] bg-clip-text">criação</b> e <b className="bg-gradient-to-l text-transparent from-[#9dbff8] to-[#3686f1] bg-clip-text">assinatura</b> de seus contratos.</p>
      <ol className="flex flex-col items-start gap-y-1 mt-5">
        <li>• Gerador de documentos</li>
        <li>• Templates personalizados</li>
        <li>• Preenchimento automático</li>
        <li>• Assinatura digital</li>
      </ol>
      <Link href={"/cadastro"} className="text-xl mt-10 border-2 border-white w-[70%] h-[50px] rounded-md relative group flex items-center justify-center overflow-hidden">
        <div className="w-full h-[60px] bg-white absolute -left-[100%] group-hover:left-0 ease-out duration-500" />
        <span className="group-hover:text-dark_bg delay-100 ease-out duration-200 absolute z-40 text-lg font-semibold">Comece agora</span>
      </Link>
    </div>
  );
}
