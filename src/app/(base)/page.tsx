import Link from "next/link";

export default function Home() {
  return (
    <div>
      Домашняя страница
      <br />
      <Link href="/dashboard">Перейти в Дэшборд</Link>
      <br />
      <Link href="/compilations">Перейти в Подборки</Link>
      <br />
      <Link href="/customers">Перейти к Клиентам</Link>
      <br />
      <Link href="/playground">Перейти в Песочницу</Link>
      <br />
      <Link href="/login">Войти</Link>
    </div>
  );
}
