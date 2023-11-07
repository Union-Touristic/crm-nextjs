import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function TypographyP({ className, children }: Props) {
  return (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        className && className,
      )}
    >
      {children}
    </p>
  );
}
