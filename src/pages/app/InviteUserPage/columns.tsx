import { Link } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getLinkAddress, getSlimName } from '@/utils/helpers';
import StatusCell from '../../../components/functional/Table/StatusCell';
import type { ISiteRecord } from '@/interfaces/site';
import { Checkbox } from '@/components/ui/checkbox';
import { NO_DATA } from '@/utils/constants';

const columns: ColumnDef<
  Pick<
    ISiteRecord,
    | 'id'
    | 'name'
    | 'hostingProvider'
    | 'domainRegistrar'
    | 'status'
    | 'lastModifiedBy'
    | 'comments'
  >
>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <Link
          to={getLinkAddress(row.original.name)}
          target='_blank'
          rel='noopener noreferrer'
          className='cursor-pointer hover:bg-transparent hover:text-inherit'
        >
          {getSlimName(row.original.name)}
        </Link>
      );
    },
  },
  {
    accessorKey: 'hostingProvider',
    header: 'Hosting provider',
    cell: ({ row }) => {
      return (
        <Link
          to={getLinkAddress(row.original.hostingProvider)}
          target='_blank'
          rel='noopener noreferrer'
          className='cursor-pointer hover:bg-transparent hover:text-inherit'
        >
          {getSlimName(row.original.hostingProvider) || NO_DATA}
        </Link>
      );
    },
  },
  {
    accessorKey: 'domainRegistrar',
    header: 'Domain registrar',
    cell: ({ row }) => {
      return (
        <Link
          to={getLinkAddress(row.original.domainRegistrar)}
          target='_blank'
          rel='noopener noreferrer'
          className='cursor-pointer hover:bg-transparent hover:text-inherit'
        >
          {getSlimName(row.original.domainRegistrar) || NO_DATA}
        </Link>
      );
    },
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
    cell: ({ row }) => {
      const comment = row.original.comments;

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='block max-w-[150px] truncate cursor-default'>
              {comment || NO_DATA}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{comment}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => <StatusCell status={row.original.status} />,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'lastModifiedBy',
    header: 'Last modified by',
  },
];

export default columns;
