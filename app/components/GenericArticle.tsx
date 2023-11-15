import { twMerge } from "tailwind-merge";

interface GenericArticleProps {
  children: React.ReactNode;
  className?: string;
}

const GenericArticle = ({ children, className }: GenericArticleProps) => {

  return (
    <article className={twMerge("min-w-[250px] min-h-[150px] bg-gradient-to-b from-neutral-300/40 to-neutral-500/100 rounded-[10px] p-4 shadow-sm flex items-center justify-center", className)}>
      {children}
    </article>
  );
};

export default GenericArticle;