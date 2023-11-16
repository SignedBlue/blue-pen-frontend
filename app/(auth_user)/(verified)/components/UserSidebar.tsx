"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineFileProtect } from "react-icons/ai";
import { IoIosArrowDropleft, IoIosArrowDroprightCircle } from "react-icons/io";
import { IconType } from "react-icons/lib";

const UserSidebar = () => {
  const [open, setopen] = useState<boolean>(true);
  const pathname = usePathname();

  const links: {
    label: string;
    icon: IconType;
    ref: string;
  }[] = [
      {
        icon: LuLayoutDashboard,
        label: "Home",
        ref: "home"
      },
      {
        icon: AiOutlineFileProtect,
        label: "Contratos",
        ref: "contratos"
      },
    ];

  return (
    <aside className={`${open ? " w-[250px] min-w-[250px]" : "w-[100px] min-w-[100px]"} ease-in-out duration-300 flex flex-col justify-between bg-black/40 backdrop-blur-lg text-white items-center gap-y-2 text-xl p-5 rounded-[20px]`}>
      <div className="flex flex-col items-start gap-y-4 w-full">
        <Link href={"/home"} className="flex items-center gap-x-3 mb-10">
          <Image
            src={"/images/Logo_white.png"}
            alt="Logo"
            width={60}
            height={60}
          />
          <div className={`${!open ? "opacity-0 -z-20" : "opacity-100 delay-100"} ease-out duration-200 flex flex-col items-start`}>
            <span className="uppercase font-bold text-2xl -mb-3 neon_text">BLUEPEN</span>
            <span className="uppercase font-semibold text-[10px] tracking-[.2rem] text-justify w-full ml-[2px]">certificates</span>
          </div>
        </Link>
        {links.map((link, i) =>
          <Link
            key={i}
            href={`/${link.ref}`}
            className={`${pathname.includes(link.ref) ? "bg-gradient-to-r from-transparent to-neutral-500/100 border-r-2 border-b border-white shadow-lg text-white font-bold" : "opacity-70 font-light hover:opacity-100"} w-full gap-x-4 px-4 h-[50px] rounded-lg ease-out duration-200 flex items-center relative`}
          >
            <link.icon size={25} className="absolute left-4" />
            <span className={`${!open ? "w-0" : "w-full"} overflow-hidden ease-out duration-100 ml-10`}>
              {link.label}
            </span>
          </Link>
        )}
      </div>
      <button onClick={() => setopen(prev => !prev)} className="text-2xl absolute bottom-2 left-2 text-white">{!open ? <IoIosArrowDroprightCircle /> : <IoIosArrowDropleft />}</button>
    </aside>
  );
};

export default UserSidebar;