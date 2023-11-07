import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const avatarPlaceholderVariants = cva(
  "inline-block overflow-hidden rounded-full bg-gray-100",
  {
    variants: {
      size: {
        default: "h-6 w-6",
        sm: "h-4 w-4",
        lg: "h-8 w-8",
        xl: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface AvatarPlaceholderProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarPlaceholderVariants> {}

function AvatarPlaceholder({
  className,
  size,
  ...props
}: AvatarPlaceholderProps) {
  return (
    <>
      <span
        className={cn(avatarPlaceholderVariants({ size }), className)}
        {...props}
      >
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    </>
  );
}

export { AvatarPlaceholder, avatarPlaceholderVariants };
