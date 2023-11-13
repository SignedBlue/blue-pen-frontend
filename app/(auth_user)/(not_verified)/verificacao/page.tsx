import { Metadata } from "next";
import AsaasForm from "../components/AsaasForm";

export const metadata: Metadata = {
  title: "Verificacao"
};

export default function VerificacaoPage() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <p className="text-center mb-5 text-xl text-white w-[75%]">
        Seja bem-vindo ao BluePen! Para reforçar a sua segurança, queremos informar que contamos com os servicos da
        <a href="https://www.asaas.com/" target="_blank" rel="noreferrer" className="bg-gradient-to-r text-transparent from-[#9dbff8] to-[#3686f1] bg-clip-text hover:opacity-70 ease-out duration-200 font-bold"> ASAAS</a>,
        uma escolha que visa proporcionar a melhor experiência em termos de segurança.
      </p>
      <AsaasForm />
    </div>
  );
}