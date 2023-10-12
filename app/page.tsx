import { LoginBtn } from "@/components/login-btn";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Home Page
      <br />
      <Link href="/crm/dashboard">Go to Dashboard</Link>
      <br />
      <Link href="/playground">Go to Playground</Link>
      <LoginBtn />
    </div>
  );
}
