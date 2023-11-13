"use client";

import { usePathname } from "next/navigation";

const PathView = () => {
  const pathName = usePathname();
  return (
    <span className="text-sm"><b>BLUEPEN</b> {pathName.replace(/\//g, " / ")}</span>
  );
};

export default PathView;