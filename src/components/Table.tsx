import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import classes from "./Table.module.css";
import { fetchSortedData } from "../fetchData";

export type Nus3Info = {
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
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "名前",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("creator", {
    header: "作成者",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "作成日時",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: "概要",
    id: "description",
    cell: (info) => (
      <span style={{ minWidth: "300px", display: "inline-block" }}>
        {info.row.original.description}
      </span>
    ),
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
  const [data, setData] = useState(() => [...defaultData]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sorting, setSorting] = useState<SortingState>([]);

  // useEffectを使わずにonSortingChangeの中でいい感じにできそうな気もする
  useEffect(() => {
    const handleChangeSort = async () => {
      const data = await fetchSortedData(sorting);
      setData(data);
    };

    // サーバーサイド側の時は、データを取得するまではloadingの表示をしたほうが良さそう
    handleChangeSort();
  }, [sorting]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    manualSorting: true,
  });

  return (
    <table className={classes.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={classes.th}>
                {header.isPlaceholder ? null : (
                  <div
                    className={
                      header.column.getCanSort() ? classes.sortBtn : undefined
                    }
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
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
              <td key={cell.id} className={classes.td}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
