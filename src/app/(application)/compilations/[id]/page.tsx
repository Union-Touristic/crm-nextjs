import { fetchToursWithMetadata } from "@/lib/data";
import { Breadcrumbs } from "@/ui/breadcrumbs";
import { CompilationTable } from "@/ui/compilation-table";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const compilation = await fetchToursWithMetadata(id);

  const tours = compilation?.tours;
  const firstTour = tours && tours[0];
  const title = firstTour ? (
    <>
      {firstTour.fromCity} &rarr; {firstTour.country}
    </>
  ) : (
    "Пустая подборка"
  );

  const content =
    tours && tours.length ? (
      <CompilationTable compilation={compilation} />
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
