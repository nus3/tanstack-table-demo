import {
  RowData,
  TableOptions,
  getCoreRowModel,
  useReactTable as useReactTableOrig,
  createColumnHelper,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export const useReactTable = <T extends RowData>(
  options: Omit<TableOptions<T>, "getCoreRowModel">
) => useReactTableOrig({ ...options, getCoreRowModel: getCoreRowModel() });

export { createColumnHelper };

export type { PaginationState, SortingState };
