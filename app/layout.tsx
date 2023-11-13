import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "BluePen",
    template: "%s | BluePen"
  },
  description: "Melhore o processo de criação e assinatura de seus contratos",
};

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={font.className}>
        <div className="flex lg:hidden flex-col items-center justify-center h-screen px-5 text-center">
          <p>Ainda estamos trabalhando na versão <b className="text-blue_button">mobile</b></p>
          <p className="text-sm">Acesse em um computador para melhor visualização</p>
        </div>
        <div className="hidden lg:block">
          <Toaster position="bottom-right" />
          {children}
        </div>
      </body>
    </html>
  );
}
