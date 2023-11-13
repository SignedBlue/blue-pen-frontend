"use client";

import { useSearchParams } from "next/navigation";

const WelcomeText = () => {
  const searchParams = useSearchParams().get("error");

  return (
    <span className="text-sm">{searchParams === "unauthorized" ? "Não autorizado, faça login para continuar" : "Faça login para continuar"}</span>
  );
};

export default WelcomeText;