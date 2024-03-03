import Image from "next/image";

const cards: Card[] = [
  {
    id: 1,
    title: "Мы работаем онлайн",
    badge: "всегда на связи",
    description:
      "На сегодняшний день клиенты предпочитают не тратить время на поход в офис и выбирают общаться дистанционно.",
    imgSrc: "/images/globe.png",
  },

  {
    id: 2,
    title: "Дипломированные специалисты",
    badge: "эффективность",
    description:
      "Мы обладаем компетенциями и большим опытом работы в области туризма.",
    imgSrc: "/images/diploma.png",
  },
  {
    id: 3,
    title: "Партнеры",
    badge: "надежность",
    description:
      "Работаем только с проверенными туроператорами. Гарантии, что ваш отдых пройдет на высоком уровне.",
    imgSrc: "/images/connections.png",
  },
  {
    id: 4,
    title: "Прозрачность",
    badge: "честность",
    description:
      "Мы придерживаемся самых высоких правовых стандартов и следуем законадательству.",
    imgSrc: "/images/transparency.png",
  },
];

export function WhyUs() {
  return (
    <div className="bg-sky-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Почему выбирают нас
        </h2>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 sm:mt-12 lg:mx-0 lg:max-w-none lg:auto-rows-fr lg:grid-cols-2">
          {cards.map((card) => {
            return <Card key={card.id} card={card} />;
          })}
        </div>
      </div>
    </div>
  );
}
type Card = {
  id: number;
  title: string;
  badge: string;
  description: string;
  imgSrc: string;
};

type CardProps = {
  card: Card;
};

function Card({ card }: CardProps) {
  return (
    <div className="relative isolate flex flex-col justify-start overflow-hidden rounded-2xl px-4 pt-4 sm:px-8 sm:pt-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white/40 to-white/0" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-white" />
      <div className="text-blue-800">
        <span className="mr-2 font-bold">·</span>
        {card.badge}
      </div>
      <h3 className="font-semi mt-3 text-2xl tracking-tight text-gray-900 sm:text-3xl">
        {card.title}
      </h3>
      <p className="mt-4 text-sm leading-5 text-gray-900 sm:mt-8 sm:text-base sm:leading-7 lg:mr-12">
        {card.description}
      </p>
      <Image
        src={card.imgSrc}
        width={600}
        height={330}
        alt="Png map background"
        className="mt-10 flex-1 object-cover"
      />
    </div>
  );
}
