"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PublicHeader = () => {
  const pathname = usePathname();

  return (
    <header className="max-w-[90%] my-5 w-full mx-auto px-6 py-4 flex items-center justify-between bg-neutral-400/40 backdrop-blur-lg text-white rounded-[25px]">
      <Link href={"/"} className="flex items-center gap-x-2">
        <Image
          src={"/images/Logo_white.png"}
          alt="Logo"
          width={70}
          height={70}
        />
        <div className="flex flex-col items-start">
          <span className="uppercase font-bold text-3xl -mb-1 neon_text">BLUEPEN</span>
          <span className="uppercase font-semibold text-xs tracking-[.25rem] text-justify w-full ml-[2px]">certificates</span>
        </div>
      </Link>

      <div className="flex items-center gap-x-4 text-white">
        <Link href={"/"} className={`${pathname === "/" ? "border-white" : "opacity-75 hover:opacity-100"} border-b-2 border-transparent  ease-out duration-200`}>Home</Link>
        <Link href={"/cadastro"} className={`${pathname === "/cadastro" ? "border-white" : "opacity-75 hover:opacity-100"} border-b-2 border-transparent  ease-out duration-200`}>Cadastre-se</Link>
        <Link href={"/login"} className={`${pathname === "/login" ? "bg-white text-dark_bg" : "hover:bg-white hover:text-dark_bg"} py-1 px-3 border-2 border-white rounded-md ease-out duration-200 font-medium`}>Login</Link>
      </div>
    </header>
  );
};

export default PublicHeader;