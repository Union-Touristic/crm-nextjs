import Image from "next/image";

export function Logo() {
  return (
    <Image src="/logo.png" width={143} height={50} alt="Логотип компании" />
  );
}
