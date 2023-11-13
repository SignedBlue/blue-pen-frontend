"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ConfigNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-x-4 mb-10 text-xl bg-dark_bg/70 rounded-[20px] backdrop-brightness-50 min-w-[40%] h-[50px] z-[100] px-5" >
      <Link href={"/admin/configuracoes/profile"} className={`${pathname.includes("profile") && "font-bold"}`}>Profile</Link>
      <Link href={"/admin/configuracoes/contrato"} className={`${pathname.includes("contrato") && "font-bold"}`}>Contrato</Link>
    </nav>
  );
};

export default ConfigNav;