import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { ComponentProps, ReactNode, createContext, useContext } from "react";

const SmallCTAContext = createContext<{ cta: CTAProps } | null>(null);

function useSmallCTAContext() {
  const context = useContext(SmallCTAContext);

  if (!context) {
    throw new Error(
      "ProductCard.* component must be rendered as child of ProductCard component",
    );
  }

  return context;
}

export type CTAProps = {
  title: string;
  subtitle: string;
};

type SmallCTAProps = {
  cta: CTAProps;
  info?: ReactNode;
  action?: ReactNode;
} & ComponentProps<"div">;

export function SmallCTA({
  cta,
  info,
  action,
  className,
  ...props
}: SmallCTAProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl p-6",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white/40 to-white/0" />
      <div className="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-white" />
      <SmallCTAContext.Provider value={{ cta }}>
        {info}
      </SmallCTAContext.Provider>
      {action}
    </div>
  );
}

export function SmallCTAInfo({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-y-3 sm:gap-y-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type SmallCTAIconProps = ComponentProps<"div"> & {
  icon?: ReactNode | string;
};

export function SmallCTAIcon({ className, icon, ...props }: SmallCTAIconProps) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 justify-center rounded-lg p-3 text-blue-800 ring-1 ring-inset ring-blue-800",
        className,
      )}
      {...props}
    >
      {icon}
    </div>
  );
}

export function SmallCTATitle({
  className,
  children,
  ...props
}: ComponentProps<"h4">) {
  const { cta } = useSmallCTAContext();
  return (
    <h4
      className={cn(
        "text-xl font-medium tracking-tight sm:text-2xl",
        className,
      )}
      {...props}
    >
      {cta.title}
    </h4>
  );
}

export function SmallCTASubtitle({
  className,
  children,
  ...props
}: ComponentProps<"p">) {
  const { cta } = useSmallCTAContext();
  return (
    <p className={cn("sm:text-lg", className)} {...props}>
      {cta.subtitle}
    </p>
  );
}

export function SmallCTAAction({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return <Button className={cn("mt-6", className)} {...props} />;
}
