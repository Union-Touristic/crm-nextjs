import { CompilationWithToursAndMetadata } from "@/lib/definitions";
import { Providers } from "./providers";
import { Table } from "./table";

type Props = {
  compilation: CompilationWithToursAndMetadata;
};

export function CompilationTable({ compilation }: Props) {
  return (
    <Providers compilation={compilation}>
      <Table />
    </Providers>
  );
}
