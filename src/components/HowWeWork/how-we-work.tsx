import {
  Timeline,
  TimelineStep,
  TimelineStepDescription,
  TimelineStepTitle,
} from "@/components/timeline";
import { HowWeWorkSmallCTA } from "./how-we-work-small-CTA";

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="bg-sky-100 px-4 py-24 dark:bg-gray-900 lg:px-6"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-6 lg:max-w-7xl lg:flex-row lg:gap-10">
        <div className="lg:max-w-[35%]">
          <h2 className="text-lg tracking-wide text-blue-800">
            Как мы работаем
          </h2>
          <div className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Начать в несколько кликов
          </div>
          <HowWeWorkSmallCTA />
        </div>
        <div className="">
          <div className="relative isolate overflow-hidden rounded-xl bg-white p-6 lg:p-16 lg:pb-0">
            <div className="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-white" />
            <Timeline>
              <TimelineStep index={1}>
                <TimelineStepTitle>Заявка</TimelineStepTitle>
                <TimelineStepDescription>
                  Вы можете оставить свою заявку на подбор тура на этой
                  странице, в директе Instagram или в WhatsApp.
                </TimelineStepDescription>
              </TimelineStep>
              <TimelineStep index={2}>
                <TimelineStepTitle>Подбор тура</TimelineStepTitle>
                <TimelineStepDescription>
                  После обработки заявки мы связываемся с вами для выбора тура.
                  Всё общение происходит в WhatsApp или так, как вам удобно:
                  переписка, голосовые сообщения или звонки.
                </TimelineStepDescription>
              </TimelineStep>
              <TimelineStep index={3}>
                <TimelineStepTitle>Договор</TimelineStepTitle>
                <TimelineStepDescription>
                  Когда тур выбран, мы заключаем с вами договор, который
                  подписывается электронной цифровой подписью. Документы,
                  подписанные с помощью ЭЦП, имеют полную юридическую силу
                  согласно законодательству Республики Казахстан.
                </TimelineStepDescription>
              </TimelineStep>
              <TimelineStep index={4}>
                <TimelineStepTitle>Оплата</TimelineStepTitle>
                <TimelineStepDescription>
                  Оплатить тур вы можете тремя способами:
                  <br />– по реквизитам на наш расчетный счет ТОО;
                  <br />– оплатить по ссылке на оплату (Kaspi Bank);
                  <br />– перевести на карты Kaspi Gold или Halyk Bank;
                  <br />
                  При любом способе оплаты вы получаете чек. Также принимаем
                  оплату через Kaspi Red или Kaspi Kredit. Работаем с
                  контрагентами ИП и ТОО.
                </TimelineStepDescription>
              </TimelineStep>
              <TimelineStep index={5}>
                <TimelineStepTitle>
                  Бронирование и подтверждение
                </TimelineStepTitle>
                <TimelineStepDescription>
                  Далее мы бронируем тур и ждем подтверждения от партнеров. По
                  мере готовности отправляем все необходимые документы. Их вы
                  получите онлайн по электронной почте или в WhatsApp.
                </TimelineStepDescription>
              </TimelineStep>
              <TimelineStep index={6}>
                <TimelineStepTitle>Отдых</TimelineStepTitle>
                <TimelineStepDescription>
                  Вы отправляетесь в путешествие которое хотели.
                </TimelineStepDescription>
              </TimelineStep>
            </Timeline>
          </div>
        </div>
      </div>
    </section>
  );
}
