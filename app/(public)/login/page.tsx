import { Metadata } from "next";
import LoginForm from "./LoginForm";
import WelcomeText from "./WelcomeText";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CookiesValues } from "@/constants/Cookies";

export const metadata: Metadata = {
  title: "Login"
};

export default function LoginPage() {
  const cookie = cookies();

  if (cookie.has("jwt") && cookie.has(CookiesValues.name)) {
    redirect(cookie.get(CookiesValues.name)?.value === CookiesValues.admin ? "/dash?refresh" : "/home?refresh");
  }

  return (
    <main className="flex flex-col items-center justify-center gap-y-5 w-full">
      <div className="flex flex-col items-center text-white ">
        <span className="_title mb-0">Bem-vindo de volta</span>
        <WelcomeText />
      </div>
      <LoginForm />
    </main>
  );
}