import Image from "next/image";

export function LogoClouds() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <Image
              className="h-12"
              src="/images/partners/anex.svg"
              width={145}
              height={39}
              alt="Anex Logo"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <Image
              className="h-12"
              src="/images/partners/kompas.svg"
              width={148}
              height={43}
              alt="Kompas Logo"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <Image
              className="h-12"
              src="/images/partners/fun-sun.svg"
              width={144}
              height={67}
              alt="Fun Sun Logo"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
            <Image
              className="h-12"
              src="/images/partners/pegas.svg"
              width={150}
              height={33}
              alt="Pegas Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
