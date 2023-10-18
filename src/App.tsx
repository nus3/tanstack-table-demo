import { useEffect, useMemo, useState } from "react";
import { Table } from "./components/Table";
import {
  createColumnHelper,
  useReactTable,
  PaginationState,
  SortingState,
} from "./functions/table";
import { fetchPaginationData, fetchSortedData } from "./fetchData";

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
  columnHelper.accessor("description", {
    header: "概要",
    id: "description",
    cell: (info) => (
      <span style={{ minWidth: "300px", display: "inline-block" }}>
        {info.getValue()}
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

function App() {
  const [data, setData] = useState(() => [...defaultData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });
  const [totalCount, setTotalCount] = useState(0);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  // useEffectを使わずにonSortingChangeの中でいい感じにできそうな気もする
  useEffect(() => {
    const handleChangeSort = async () => {
      const data = await fetchSortedData(sorting);
      setData(data);
    };

    // サーバーサイド側の時は、データを取得するまではloadingの表示をしたほうが良さそう
    handleChangeSort();
  }, [sorting]);

  // useEffectを使わずにonPaginationChangeの中でいい感じにできそうな気もする
  useEffect(() => {
    const handleChangePage = async () => {
      const { data, count } = await fetchPaginationData(pageIndex);
      setData(data);
      setTotalCount(count);
    };

    // サーバーサイド側の時は、データを取得するまではloadingの表示をしたほうが良さそう
    handleChangePage();
  }, [pageIndex, pagination]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    pageCount: 3, // apiから取得する
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
    enableMultiSort: false,
  });

  return (
    <>
      <h1>TanStack Table Demo</h1>
      <Table
        table={table}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </>
  );
}

export default App;
