import { Logo } from "@/ui/logo";

const navigation = {
  socials: [
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
  ],
  collaboration: [
    { name: "Вакансии", href: "#" },
    { name: "Партнеры", href: "#" },
  ],
  company: [
    { name: "О нас", href: "#" },
    { name: "Блог", href: "#" },
  ],
  legal: [
    { name: "Политика конфиденциальности", href: "#" },
    { name: "Лицензия", href: "#" },
  ],
};

export function FooterFourColumnWithCompanyMissionOnDark() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Logo />
            <p className="text-sm leading-6 text-gray-300">
              Товарищество с ограниченной ответственностью «Union Touristic»
              <br />
              010020, Республика Казахстан, г. Астана
              <br />
              БИН 220740005050
            </p>
          </div>
          <div className="XXX mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Сотрудничество
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.collaboration.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Соц. сети
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.socials.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Компания
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Документы
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2022 - 2023 Union Touristic
          </p>
        </div>
      </div>
    </footer>
  );
}
