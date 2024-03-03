import { cn } from "@/lib/utils";
import { inter } from "@/ui/fonts";
import "@/ui/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Union Touristic",
    default: "Дэшборд | Union Touristic",
  },
  description: "Дэшборд для управления турами",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ru" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-blue-800 selection:text-white",
          inter.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
