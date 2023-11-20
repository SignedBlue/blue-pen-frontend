import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "./LoginForm";

import { CookiesValues } from "@/constants/Cookies";

export const metadata: Metadata = {
  title: "Login"
};

export default function LoginPage() {
  const cookie = cookies();

  if (cookie.has("jwt") && cookie.has(CookiesValues.name)) {
    redirect(cookie.get(CookiesValues.name)?.value === CookiesValues.admin ? "/admin/dash?refresh" : "/home?refresh");
  }

  return (
    <main className="flex flex-col items-center justify-center gap-y-5 w-full">
      <div className="flex flex-col items-center text-white ">
        <span className="_title mb-0">Bem-vindo de volta</span>
        <p className="text-sm">Faça login para continuar.</p>
      </div>
      <LoginForm />
    </main>
  );
}