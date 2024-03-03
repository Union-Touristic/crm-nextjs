export function ContactSectionSideBySideGrid() {
  return (
    <section id="contacts" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Наши контакты
              </h2>
              <p className="mt-4 leading-7 text-gray-600">
                Связаться с нами можно следующими способами
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Телефон
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Номер телефона</dt>
                    <dd>
                      <a
                        className="font-semibold text-blue-600"
                        href="tel:+77476766121"
                      >
                        +7 (747) 676-6121
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  E-mail
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Электронная почта</dt>
                    <dd>
                      <a
                        className="font-semibold text-blue-600"
                        href="mailto:ltduniontouristic@gmail.com"
                      >
                        ltduniontouristic@gmail.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  WhatsApp
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Номер Whatsapp</dt>
                    <dd>
                      <a
                        className="font-semibold text-blue-600"
                        href="https://wa.me/77476766121"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +7 (747) 676-6121
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Instagram
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Инстаграм</dt>
                    <dd>
                      <a
                        className="font-semibold text-blue-600"
                        href="https://instagram.com/uniontouristic.kz"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @uniontouristic
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
