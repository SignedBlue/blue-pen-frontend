import { cookies } from "next/headers";
import dynamic from "next/dynamic";

import { CookiesValues } from "@/constants/Cookies";
import { AuthContextProvider } from "@/providers/AuthProvider";
import UserAccount from "@/app/components/UserAccount";

// components
const UserSidebar = dynamic(() => import("./components/UserSidebar"));
const PathView = dynamic(() => import("@/app/components/PathView"));

export default function VerifiedUserLayout({ children }: { children: React.ReactNode }) {
  const cookie = cookies();
  const userName = cookie.get("name")?.value;

  return (
    <main className={"flex h-screen bg-[#3b4150] p-4 gap-4 relative overflow-hidden"} >
      <span className="w-[50vw] h-[300px] border-4 border-white/80 absolute top-[10%] left-[10%] skew-x-[45deg] distorted-box animate-pulse neon_text" />
      <span className="w-[35vw] h-[450px] border-2 border-white/50 absolute top-[15%] left-[10%] skew-x-[45deg]" />
      <UserSidebar />
      <section className="w-full flex flex-col items-stretch gap-y-4">
        <header className="px-10 py-5 flex items-center justify-between bg-black/40 backdrop-blur-lg text-white rounded-[25px] z-50">
          <PathView />
          <div className="flex items-center justify-end gap-x-5">
            <UserAccount userName={userName as string} />
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