import ConfigNav from "../../components/ConfigNav";

export default function ConfigLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start relative">
      <ConfigNav />
      {children}
    </div>
  );
}