import MobileSidebar from "./_components/Sidebar/Mobile";
import DekstopSidebar from "./_components/Sidebar/Dekstop";
import TopPanel from "./_components/Sidebar/TopPanel";
import { SidebarProvider } from "./_context/SidebarContext";
import { ModalProvider } from "@/components/modal-provider";

export default function SidebarLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
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
  );
}
