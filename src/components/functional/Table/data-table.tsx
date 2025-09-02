import { useState } from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
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
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isGroup = header.depth === 0 && header.colSpan > 1;
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`
                      ${
                        // Hosting group header
                        header.column.id === 'Hosting'
                          ? 'bg-blue-200 text-white text-center font-semibold'
                          : ''
                      }
                      ${
                        // Subheaders under Hosting group
                        !isGroup && header.column?.parent?.id === 'Hosting'
                          ? 'bg-blue-100 text-blue-800 text-center'
                          : ''
                      }
                      ${
                        // Domain group header
                        header.column.id === 'Domain'
                          ? 'bg-green-200 text-white text-center font-semibold'
                          : ''
                      }
                      ${
                        // Subheaders under Domain group
                        !isGroup && header.column?.parent?.id === 'Domain'
                          ? 'bg-green-100 text-green-800 text-center'
                          : ''
                      }
                    `}
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
                      className={
                        isHostingCell
                          ? 'bg-blue-50 text-blue-900'
                          : isDomainCell
                          ? 'bg-green-50 text-green-900'
                          : ''
                      }
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
