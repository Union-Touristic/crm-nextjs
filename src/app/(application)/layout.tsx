import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/ui/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

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

export default function ApplicationRootLayout({ children }: Props) {
  return (
    <html lang="ru" className="h-full" suppressHydrationWarning>
      <body className={cn("h-full font-sans antialiased", fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}
