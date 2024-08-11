import { CardTilt } from "@/components/card-tilt";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const benefits = [
  "Не надо приезжать в офис",
  "Все общение по телефону или онлайн",
  "Персональный агент всегда с вами на связи",
  "Прозрачные документы с соблюдением законов",
  "Компетентные специалисты в туризме",
  "Надежные партнеры. Гарантии от наших туроператоров",
];

export function CTASectionTwoColumnsWithPhotoOnDark() {
  return (
    <section id="about" className="bg-gray-900 py-24 sm:py-32">
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-start lg:py-20 xl:gap-x-20 xl:px-20">
            <div className="hidden w-auto lg:block">
              <CardTilt />
            </div>
            <div className="w-full flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Путешествие которое вы ждали
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Современные проблемы требуют современных решений. Чтобы
                отправиться в идеальный тур нет необходимости тратить много
                времени на его поиск. Поручите это нам.
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2"
              >
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-x-3">
                    <CheckIcon
                      className="h-7 w-5 flex-none"
                      aria-hidden="true"
                    />

                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex">
                <figure className="rounded-2xl bg-white p-6 ring-1 ring-gray-900/[.05]">
                  <figcaption className="flex items-center gap-x-3">
                    {/* TODO: поменять картинку на реальную */}
                    <Image
                      src="/images/alibek.jpg"
                      width={256}
                      height={256}
                      alt="Customer"
                      className="h-10 w-10 rounded-lg bg-gray-50"
                    />
                    <div className="flex gap-x-2">
                      <span className="font-semibold">Alibek Massalimov</span>
                      <span>·</span>
                      <span className="text-gray-600">Директор компании</span>
                    </div>
                  </figcaption>
                  <blockquote className="mt-4 text-gray-900">
                    “Мы хорошо знаем тонкости туристской деятельности благодаря
                    полученному образованию и многолетнему опыту.”
                  </blockquote>
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
