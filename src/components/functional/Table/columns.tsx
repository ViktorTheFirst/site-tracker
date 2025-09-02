import {
  CircleAlert,
  CircleCheck,
  MoreHorizontal,
  ArrowUpDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { type ColumnDef } from '@tanstack/react-table';

import type { SiteStatus as SiteStatusType } from '@/interfaces/general';
import { SiteStatus } from '@/interfaces/general';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getLinkAddress, getSlimName } from '@/utils/helpers';

export interface SiteRecord {
  id?: string;
  name: string;

  hostingLogin: string;
  hostingPassword: string;
  hostingValiduntil: string;

  domainLogin: string;
  domainPassword: string;
  domainValiduntil: string;

  comments: string;
  status: SiteStatusType;
  lastModifiedBy: string;
}

export const columns: ColumnDef<SiteRecord>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      console.log('TO', getLinkAddress(row.original.name));
      console.log('ORIGINAL', row.original.name);
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
        header: 'login',
      },
      {
        accessorKey: 'hostingPassword',
        header: 'password',
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
              className='cursor-pointer hover:bg-transparent hover:text-inherit'
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
        header: 'login',
      },
      {
        accessorKey: 'domainPassword',
        header: 'password',
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
              className='cursor-pointer hover:bg-transparent hover:text-inherit'
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
    cell: ({ row }) => {
      if (row.original.status === SiteStatus.ACTIVE) {
        return <CircleCheck className='bg-green-50 text-green-900' />;
      }
      return <CircleAlert className='bg-red-50 text-red-900' />;
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='cursor-pointer'
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
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0 cursor-pointer'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit site</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-500'>
              Remove site
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
