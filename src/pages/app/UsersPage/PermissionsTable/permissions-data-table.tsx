import { useState, useEffect } from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSiteSelection: (state: any) => void;
  existingAccess: number[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSiteSelection,
  existingAccess,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  // Initialize row selection based on existingAccess
  useEffect(() => {
    if (data?.length > 0 && existingAccess?.length > 0) {
      const initialSelection: Record<string, boolean> = {};

      data.forEach((row, index) => {
        const rowId = (row as any).id;
        if (existingAccess.includes(rowId)) {
          initialSelection[index.toString()] = true;
        }
      });

      setRowSelection(initialSelection);
    }
  }, [data, existingAccess]);

  const handleSelection = (updater: any) => {
    const newSelection =
      typeof updater === 'function' ? updater(rowSelection) : updater;

    setRowSelection(newSelection);

    const selectedRows = table
      .getCoreRowModel()
      .rows.filter((row) => newSelection[row.id]);

    const selectedIds = selectedRows.map((row) => (row.original as any).id);
    onSiteSelection(selectedIds);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: handleSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className='bg-gray-300 dark:bg-gray-700 text-center font-semibold'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='h-14'
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} className='text-center'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
