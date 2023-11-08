import {
  TableHeadCheckbox,
  TableSortButton,
} from "@/ui/compilation-table/elements";

export function Thead() {
  return (
    <thead className="sticky top-0 z-20 flex basis-full">
      <tr className="flex basis-full border-y border-gray-300 bg-gray-200 text-left text-xs text-gray-900">
        <th scope="col" className="relative w-9 shrink-0 py-3 pl-3">
          <TableHeadCheckbox />
        </th>
        <th
          scope="col"
          className="min-w-[200px] flex-1 shrink-0 p-2 py-3 font-medium"
        >
          Отель
        </th>
        <th scope="col" className="w-24 shrink-0 p-2 py-3 font-medium">
          Вылет
        </th>
        <th scope="col" className="w-28 shrink-0 p-2 py-3 font-medium">
          <TableSortButton sortKey="departureDate">Заселение</TableSortButton>
        </th>
        <th scope="col" className="w-36 shrink-0 p-2 py-3 font-medium">
          Питание и номер
        </th>
        <th
          scope="col"
          className="flex w-20 shrink-0 justify-end p-2 py-3 font-medium"
        >
          <TableSortButton sortKey="price">Цена</TableSortButton>
        </th>
        <th scope="col" className="w-28 shrink-0 py-3 pl-2 pr-3 font-medium">
          Действия
        </th>
      </tr>
    </thead>
  );
}
