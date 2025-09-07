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
import PasswordCell from '../../../components/functional/Table/PasswordCell';
import StatusCell from '../../../components/functional/Table/StatusCell';
import type { ISiteRecord } from '@/interfaces/site';
import ActionsCell from '@/components/functional/Table/ActionCell';

const columns: ColumnDef<ISiteRecord>[] = [
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
    id: 'Hosting',
    header: 'Hosting',
    columns: [
      {
        accessorKey: 'hostingLogin',
        header: 'Login',
      },
      {
        accessorKey: 'hostingPassword',
        header: 'Password',
        cell: ({ getValue }) => <PasswordCell value={getValue<string>()} />,
      },
      {
        accessorKey: 'hostingValiduntil',
        header: ({ column }) => {
          return (
            <Button
              variant='ghost'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
              className='hover:bg-transparent hover:text-inherit'
            >
              Valid until
              <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
          );
        },
      },
    ],
  },
  {
    header: 'Domain',
    columns: [
      {
        accessorKey: 'domainLogin',
        header: 'Login',
      },
      {
        accessorKey: 'domainPassword',
        header: 'Password',
        cell: ({ getValue }) => <PasswordCell value={getValue<string>()} />,
      },
      {
        accessorKey: 'domainValiduntil',
        header: ({ column }) => {
          return (
            <Button
              variant='ghost'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
              className='hover:bg-transparent hover:text-inherit'
            >
              Valid until
              <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
          );
        },
      },
    ],
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
              {comment}
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
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell site={row.original} />,
  },
];

export default columns;
