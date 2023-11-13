"use client";

import { useRouter } from "next/navigation";

const RouterBackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex flex-col items-end group"
    >
      <span>Voltar</span>
      <div className="w-[0px] h-[2px] bg-white group-hover:w-full ease-out duration-200" />
    </button>
  );
};

export default RouterBackButton;