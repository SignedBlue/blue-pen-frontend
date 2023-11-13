import dynamic from "next/dynamic";
import Image from "next/image";

// components
const LogoutButton = dynamic(() => import("@/app/components/LogoutButton"));
const PathView = dynamic(() => import("@/app/components/PathView"));

export default function NotVerifiedUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen bg-dark_bg w-full">
      <section className="max-w-[70%] mx-auto flex flex-col items-center justify-between h-full">
        <header className="my-5 w-full px-6 py-4 flex items-center justify-between bg-neutral-400/40 backdrop-blur-lg text-white rounded-[25px]">
          <div className="flex items-center gap-x-2">
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
          </div>
          <PathView />
          <LogoutButton />
        </header>
        <div className="flex flex-col items-center justify-center gap-y-4 h-full w-full text-white">
          {children}
        </div>
      </section>
    </main>
  );
}