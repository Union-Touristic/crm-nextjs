import { LoginBtn } from "@/ui/login-btn";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Домашняя страница
      <br />
      <Link href="/dashboard">Перейди в Дэшборд</Link>
      <br />
      <Link href="/playground">Перейти в Песочницу</Link>
      <LoginBtn />
    </div>
  );
}
