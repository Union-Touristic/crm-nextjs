import { fetchToursByCompilationId } from "@/lib/data";
import { Tour } from "@/lib/db/schema";
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
  const title = (
    <>
      {firstTour.fromCity} &rarr; {firstTour.country}
    </>
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
            label: <CompilationTitle tour={firstTour} />,
            href: `/compilations/${id}`,
            active: true,
          },
        ]}
        className="pt-6 pb-5"
      />
      {content}
    </>
  );
}

function CompilationTitle({ tour }: { tour: Tour }) {
  return (
    <>
      {tour.fromCity} &rarr; {tour.country}
    </>
  );
}
