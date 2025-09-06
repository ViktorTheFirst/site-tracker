import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
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
      <div className='flex items-center justify-between mb-6'>
        <div className='relative w-full max-w-xs'>
          <Search
            className='absolute left-3 top-4 -translate-y-1/2 text-gray-400'
            size={16}
          />
          <Input
            id='search site name'
            placeholder='Search address...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='max-w-xs pl-10'
          />
        </div>
        <h2 className='text-2xl font-bold tracking-tight'>Sites management</h2>
        <div className='flex gap-2'>
          <Button
            variant='default'
            className='flex items-center gap-1'
            onClick={() => navigate('/app/add-site')}
          >
            <Plus className='w-4 h-4' /> Add
          </Button>
        </div>
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
                      className={clsx('bg-gray-300 text-center font-semibold', {
                        'bg-blue-200 text-center font-semibold':
                          isHostingHeader,
                        'bg-green-200  text-center font-semibold':
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
