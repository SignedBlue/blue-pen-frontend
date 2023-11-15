import { cookies } from "next/headers";
import dynamic from "next/dynamic";

// components
const Sidebar = dynamic(() => import("./components/Sidebar"));
const PathView = dynamic(() => import("../components/PathView"));
const LogoutButton = dynamic(() => import("../components/LogoutButton"));

// providers
import { AuthContextProvider } from "@/providers/AuthProvider";
import { CookiesValues } from "@/constants/Cookies";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const cookie = cookies();
  const userName = cookie.get("name")?.value;

  // original color bg-neutral-400 // 22262f
  return (
    <main className={"flex h-screen bg-[#3b4150] p-4 gap-4 relative overflow-hidden"} >
      <span className="w-[50vw] h-[300px] border-4 border-white/80 absolute top-[10%] left-[10%] skew-x-[45deg] distorted-box animate-pulse neon_text" />
      <span className="w-[35vw] h-[450px] border-2 border-white/50 absolute top-[15%] left-[10%] skew-x-[45deg]" />
      <Sidebar />
      <section className="w-full flex flex-col items-stretch gap-y-4">
        <header className="px-10 py-5 flex items-center justify-between bg-black/40 backdrop-blur-lg text-white rounded-[25px]">
          <PathView />
          <div className="flex items-center justify-end gap-x-5">
            <LogoutButton />
            <span>{userName}</span>
            <span className="w-[40px] h-[40px] bg-neutral-400 flex items-center justify-center rounded-full uppercase font-bold text-sm">{userName?.slice(0, 1)}</span>
          </div>
        </header>
        <div className="bg-black/40 backdrop-blur-lg text-white rounded-[25px] h-full overflow-y-scroll p-10">
          <AuthContextProvider>
            {cookie.get(CookiesValues.name)?.value !== CookiesValues.admin && null}
            {children}
          </AuthContextProvider>
        </div>
      </section>
    </main>
  );
}
