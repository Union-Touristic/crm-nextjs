import {
  TableHeadCheckbox,
  TableSortButton,
} from "@/ui/compilation-table/elements";

export function Thead() {
  return (
    <thead className="bg-gray-200 border-y border-gray-300">
      <tr className="flex text-left text-xs text-gray-900">
        <th scope="col" className="relative w-9 pl-3 py-3">
          <TableHeadCheckbox />
        </th>
        <th scope="col" className="flex-1 font-medium p-2 py-3">
          Отель
        </th>
        <th scope="col" className="w-24 font-medium p-2 py-3">
          Вылет
        </th>
        <th scope="col" className="w-28 font-medium p-2 py-3">
          <TableSortButton sortKey="departureDate">Заселение</TableSortButton>
        </th>
        <th scope="col" className="w-36 font-medium p-2 py-3">
          Питание и номер
        </th>
        <th scope="col" className="w-20 flex justify-end font-medium p-2 py-3">
          <TableSortButton sortKey="price">Цена</TableSortButton>
        </th>
        <th scope="col" className="w-28 font-medium py-3 pl-2 pr-3">
          Действия
        </th>
      </tr>
    </thead>
  );
}
