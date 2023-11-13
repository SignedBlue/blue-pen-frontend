import { Metadata } from "next";
import dynamic from "next/dynamic";
const RegisterForm = dynamic(() => import("./RegisterForm"));
export const metadata: Metadata = {
  title: "Cadastro"
};

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-y-5 w-full">
      <div className="flex flex-col items-center text-white ">
        <span className="_title mb-0">Cadastre-se</span>
        <span className="text-sm">Crie sua conta e comece a usar</span>
      </div>
      <RegisterForm />
    </main>
  );
}