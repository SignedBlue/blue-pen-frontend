import Link from "next/link";

export default function LogoutPage() {
  return (
    <div className="text-white flex flex-col items-center" >
      <p className="_title text-2xl text-center mb-5">Você foi desconectado com sucesso. Esperamos vê-lo novamente em breve!</p>
      <Link href={"/"} className="text-xl mt-10 border-2 border-white w-[40%] h-[50px] rounded-md relative group flex items-center justify-center overflow-hidden">
        <div className="w-full h-[60px] bg-white absolute left-[100%] group-hover:left-0 ease-out duration-500" />
        <span className="group-hover:text-dark_bg delay-100 ease-out duration-200 absolute z-40 text-lg font-semibold">Home</span>
      </Link>
    </div>
  );
}