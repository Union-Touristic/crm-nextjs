import MobileHeader from "@/ui/application/mobile-header";
import Sidebar from "@/ui/application/sidebar";
import type { Metadata } from "next";
import { auth } from "~/auth";

export const metadata: Metadata = {
  title: "Дэшборд",
  description: "Дэшборд для управления турами",
};

type Props = { children: React.ReactNode };

export default async function ApplicationTemplate({ children }: Props) {
  const session = await auth();

  if (session?.user) {
    return (
      <div>
        <Sidebar user={session.user} />
        <MobileHeader user={session.user} />

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    );
  }
  throw new Error("TODO: implement Error");
}
