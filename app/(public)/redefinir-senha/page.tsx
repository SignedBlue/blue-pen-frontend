import { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Redefinir senha"
};

export default function RedefinePasswordPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-y-5 w-full">
      <div className="flex flex-col items-center text-white ">
        <span className="_title mb-0">Redefinição de senha</span>
        <p className="text-sm">Esqueceu sua senha? Vamos resolver isso!</p>
      </div>

      <ForgotPasswordForm />
    </main>
  );
}