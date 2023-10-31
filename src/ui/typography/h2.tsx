import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function TypograhyH2({ className, children }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className && className
      )}
    >
      {children}
    </h1>
  );
}
