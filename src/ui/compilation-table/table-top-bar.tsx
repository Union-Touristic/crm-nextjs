import {
  TableTopBarCopyButton,
  TableTopBarDeleteButton,
  UpdateButton,
} from "@/ui/compilation-table/elements";

export function TableTopBar() {
  return (
    <div className="flex-initial px-3 py-2 flex justify-between">
      <div className="flex space-x-3">
        <TableTopBarCopyButton>Скопировать в виде текста</TableTopBarCopyButton>
        <TableTopBarDeleteButton>Удалить</TableTopBarDeleteButton>
      </div>
      <div>
        <UpdateButton />
      </div>
    </div>
  );
}
