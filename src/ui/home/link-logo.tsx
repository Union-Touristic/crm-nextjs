"use client";
import { Logo } from "@/ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LinkLogo() {
  const pathname = usePathname();

  return (
    <Link href={pathname === "/home" ? "/home" : "/"} className="-m-1.5 p-1.5">
      <span className="sr-only">Дэшборд «Union Touristic»</span>
      <Logo />
    </Link>
  );
}
