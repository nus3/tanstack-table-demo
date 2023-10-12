import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useState } from "react";

type Nus3Info = {
  id: string;
  name: string;
  creator: string;
  createdAt: string;
  description: string;
};

const defaultData: Nus3Info[] = [
  {
    id: "1",
    name: "name-1",
    creator: "creator-1",
    createdAt: "2021-01-01",
    description: "description-1",
  },
  {
    id: "2",
    name: "name-2",
    creator: "creator-2",
    createdAt: "2021-01-01",
    description: "description-2",
  },
  {
    id: "3",
    name: "name-3",
    creator: "creator-3",
    createdAt: "2021-01-01",
    description: "description-3",
  },
];

const columnHelper = createColumnHelper<Nus3Info>();

const columns = [
  columnHelper.display({
    id: "edit",
    cell: (props) => (
      <button
        onClick={() => {
          console.info(props.row, "編集する行情報");
        }}
      >
        編集
      </button>
    ),
  }),
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: () => "名前",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("creator", {
    header: () => "作成者",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: () => "作成日時",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: () => "概要",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "delete",
    cell: (props) => (
      <button
        onClick={() => {
          console.info(props.row, "削除する行情報");
        }}
      >
        削除
      </button>
    ),
  }),
];

type TableProps = {
  foo?: string;
};

export const Table: FC<TableProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
