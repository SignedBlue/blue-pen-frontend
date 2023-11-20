"use client";

import { useRouter } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";

const RouterBackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="h-[40px] w-[110px] flex items-center justify-center group border rounded-md relative overflow-hidden"
    >
      <span className="flex items-center gap-x-2 ">
        <i className="group-hover:-translate-x-1 ease-out duration-200"><MdArrowBackIos /></i>
        <span>Voltar</span>
      </span>
      {/* <span className="absolute bottom-0 left-[100%] w-full h-full bg-white group-hover:left-0 ease-out duration-300" /> */}
    </button>
  );
};

export default RouterBackButton;