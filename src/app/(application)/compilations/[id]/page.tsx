import { fetchToursByCompilationId } from "@/lib/data";
import { Breadcrumbs } from "@/ui/breadcrumbs";
import { CompilationTable } from "@/ui/compilation-table/compilation-table";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const compilationTours = await fetchToursByCompilationId(id);
  const firstTour = compilationTours[0];
  const title = firstTour ? (
    <>
      {firstTour.fromCity} &rarr; {firstTour.country}
    </>
  ) : (
    "Пустая подборка"
  );

  const content = compilationTours.length ? (
    <CompilationTable compilationTours={compilationTours} />
  ) : (
    <h2>В подборке нет туров, добавьте туры с помощью расширения хром</h2>
  );

  return (
    <>
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        {title}
      </h2>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Подборки", href: "/compilations" },
          {
            label: title,
            href: `/compilations/${id}`,
            active: true,
          },
        ]}
        className="pb-5 pt-6"
      />
      {content}
    </>
  );
}
