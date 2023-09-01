import MobileSidebar from "./_components/Sidebar/Mobile";
import DekstopSidebar from "./_components/Sidebar/Dekstop";
import TopPanel from "./_components/Sidebar/TopPanel";
import { SidebarProvider } from "./_context/SidebarContext";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MobileSidebar />
      <DekstopSidebar />
      <div className="flex flex-col md:pl-64">
        <TopPanel />
        {children}
      </div>
    </SidebarProvider>
  );
}
