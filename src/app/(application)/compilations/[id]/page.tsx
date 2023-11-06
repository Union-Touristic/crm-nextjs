import { fetchToursByCompilationId } from "@/lib/data";
import { CompilationTable } from "@/ui/compilation-table/compilation-table";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const compilationTours = await fetchToursByCompilationId(id);

  const content = compilationTours.length ? (
    <CompilationTable compilationTours={compilationTours} />
  ) : (
    <h2>В подборке нет туров, добавьте туры с помощью расширения хром</h2>
  );

  return content;
}
