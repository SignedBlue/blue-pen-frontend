import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full border-2">
      <h2 className="text-2xl font-bold">Ui, parece que essa página não existe ou ainda não foi criada</h2>
      <Link href="/dash">Volte para a home</Link>
    </div>
  );
}