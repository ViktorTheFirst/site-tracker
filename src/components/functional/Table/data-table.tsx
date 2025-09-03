import { useState } from 'react';
import clsx from 'clsx';
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
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className='relative w-full max-w-sm'>
        <Search
          className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
          size={16}
        />
        <Input
          id='search site name'
          placeholder='Search address...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm pl-10 mb-5'
        />
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isGroup = header.depth === 0 && header.colSpan > 1;
                  const isHostingSubHeader =
                    !isGroup && header.column?.parent?.id === 'Hosting';
                  const isDomainSubHeader =
                    !isGroup && header.column?.parent?.id === 'Domain';
                  const isHostingHeader = header.column.id === 'Hosting';
                  const isDomainHeader = header.column.id === 'Domain';

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={clsx({
                        'bg-blue-200 text-white text-center font-semibold':
                          isHostingHeader,
                        'bg-green-200 text-white text-center font-semibold':
                          isDomainHeader,
                        'bg-blue-100 text-blue-800 text-center':
                          isHostingSubHeader,
                        'bg-green-100 text-green-800 text-center':
                          isDomainSubHeader,
                      })}
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
                    const isHostingCell = cell.column.id.startsWith('hosting');
                    const isDomainCell = cell.column.id.startsWith('domain');

                    return (
                      <TableCell
                        key={cell.id}
                        className={clsx({
                          'bg-blue-50 text-blue-900': isHostingCell,
                          'bg-green-50 text-green-900': isDomainCell,
                        })}
                      >
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
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
