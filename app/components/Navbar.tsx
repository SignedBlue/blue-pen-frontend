import RouterBackButton from "./RouterBackButton";

interface NavbarProps {
  children: React.ReactNode;
  routerBack?: boolean;
  title: string;
}

const Navbar = ({ children, title, routerBack = false }: NavbarProps) => {
  return (
    <nav className="w-full flex items-center justify-between mb-10">
      <div className="flex items-center gap-x-4">
        {routerBack && <RouterBackButton />}
        <span className="_title mb-0">{title}</span>
      </div>

      {children}
    </nav>
  );
};

export default Navbar;