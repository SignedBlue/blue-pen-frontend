import Image from "next/image";
import PublicHeader from "./components/PublicHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full md:h-screen flex flex-col items-center justify-center bg-dark_bg relative">
      <PublicHeader />
      <section className="h-full max-w-[90%] w-full flex flex-col-reverse md:flex-row items-center justify-between gap-x-10">
        <div className="w-full md:w-[45%] h-[400px] relative flex items-center justify-center">
          <Image
            src={"/images/Electronic_signature.png"}
            alt="Logo"
            fill
            className="object-contain z-[50]"
            priority
          />
        </div>
        <div className="w-full md:w-[50%]">
          {children}
        </div>
      </section>
    </main>
  );
}
