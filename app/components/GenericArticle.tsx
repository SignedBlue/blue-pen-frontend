import { twMerge } from "tailwind-merge";

interface GenericArticleProps {
  children: React.ReactNode;
  className?: string;
}

const GenericArticle = ({
  children,
  className
}: GenericArticleProps) => {
  return (
    <article className={twMerge("min-w-[250px] min-h-[150px] border-2 border-dark_bg bg-dark_bg/50 rounded-[10px] p-4 shadow-sm flex items-center justify-center", className)}>
      {children}
    </article>
  );
};

export default GenericArticle;