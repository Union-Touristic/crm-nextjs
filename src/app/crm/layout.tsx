import MobileSidebar from "./_components/Sidebar/Mobile";
import DekstopSidebar from "./_components/Sidebar/Dekstop";
import TopPanel from "./_components/Sidebar/TopPanel";
import { SidebarProvider } from "./_context/SidebarContext";
import { ModalProvider } from "@/components/modal-provider";
import "@/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Union Touristic",
    default: "Дэшборд | Union Touristic",
  },
  description: "Дэшборд для управления турами",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full bg-gray-100" suppressHydrationWarning>
      <body className={`h-full ${inter.className}`}>
        <Providers>
          <SidebarProvider>
            <MobileSidebar />
            <DekstopSidebar />
            <div className="flex flex-col md:pl-64">
              <TopPanel />
              <ModalProvider>
                {children}
                {modal}
              </ModalProvider>
            </div>
          </SidebarProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
