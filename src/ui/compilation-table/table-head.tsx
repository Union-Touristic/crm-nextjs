import {
  TableHeadCheckbox,
  TableSortButton,
} from "@/ui/compilation-table/elements";

export function Thead() {
  return (
    <thead className="border-y border-gray-300 bg-gray-200">
      <tr className="flex text-left text-xs text-gray-900">
        <th scope="col" className="relative w-9 py-3 pl-3">
          <TableHeadCheckbox />
        </th>
        <th scope="col" className="flex-1 p-2 py-3 font-medium">
          Отель
        </th>
        <th scope="col" className="w-24 p-2 py-3 font-medium">
          Вылет
        </th>
        <th scope="col" className="w-28 p-2 py-3 font-medium">
          <TableSortButton sortKey="departureDate">Заселение</TableSortButton>
        </th>
        <th scope="col" className="w-36 p-2 py-3 font-medium">
          Питание и номер
        </th>
        <th scope="col" className="flex w-20 justify-end p-2 py-3 font-medium">
          <TableSortButton sortKey="price">Цена</TableSortButton>
        </th>
        <th scope="col" className="w-28 py-3 pl-2 pr-3 font-medium">
          Действия
        </th>
      </tr>
    </thead>
  );
}
