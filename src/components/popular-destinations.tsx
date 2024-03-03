import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    id: 1,
    title: "Турция",
    href: "#",
    backgroundImg: "/images/turkiye-destination-cover.jpg",
    fadeMapUrl: "/images/turkiye-fade-map.png",
  },
  {
    id: 2,
    title: "ОАЭ",
    href: "#",
    backgroundImg: "/images/uae-destination-cover.jpg",
    fadeMapUrl: "/images/uae-fade-map.png",
  },
  {
    id: 3,
    title: "Таиланд",
    href: "#",
    backgroundImg: "/images/thailand-destination-cover.jpg",
    fadeMapUrl: "/images/thailand-fade-map.png",
  },
];

export function PopularDestinations() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Популярные направления
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Что выбирают наши клиенты
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-12 md:mx-0 md:max-w-none md:grid-cols-3">
          {destinations.map((d) => (
            <DestinationArticle destination={d} key={d.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

type ArticleProps = {
  destination: {
    id: number;
    href: string;
    title: string;
    backgroundImg: string;
    fadeMapUrl: string;
  };
};

function DestinationArticle({ destination }: ArticleProps) {
  return (
    <article className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 bg-cover bg-top px-5 pb-8 pt-48 hover:shadow-2xl hover:transition-shadow lg:px-8 lg:pt-96">
      <Image
        src={destination.backgroundImg}
        width={640}
        height={427}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <Image
        src={destination.fadeMapUrl}
        width={400}
        height={250}
        alt="Png map background"
        className="absolute right-0 top-0 group-hover:opacity-80 group-hover:transition-all"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      <div className="overflow-hidden text-sm leading-6 text-gray-300">
        Направление
      </div>
      <h3 className="font-semi mt-3 text-3xl leading-6 tracking-wide text-white">
        <Link href={destination.href}>
          <span className="absolute inset-0" />
          {destination.title}
        </Link>
      </h3>
    </article>
  );
}
