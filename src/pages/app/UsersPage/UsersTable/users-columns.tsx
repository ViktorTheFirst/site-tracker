import { type ColumnDef } from '@tanstack/react-table';

import { UserStatus, type IUser } from '@/interfaces/user';
import { Badge } from '@/components/ui/badge';
import { BadgeCheckIcon, CircleX, Clock } from 'lucide-react';
import UserActionCell from '@/components/functional/Table/UserActionCell';

const columns: ColumnDef<
  Pick<
    IUser,
    | 'name'
    | 'email'
    | 'role'
    | 'status'
    | 'isDisabled'
    | 'createdAt'
    | 'allowedSiteIds'
  >
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return <Badge variant='outline'>{row.original.role}</Badge>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      if (row.original.status === UserStatus.ACCEPTED) {
        return (
          <Badge
            variant='secondary'
            className='bg-green-500/20 text-green-800 border-none font-semibold'
          >
            <BadgeCheckIcon />
            Accepted
          </Badge>
        );
      }

      if (row.original.status === UserStatus.CANCELED) {
        return (
          <Badge variant='destructive'>
            <CircleX />
            Canceled
          </Badge>
        );
      }

      return (
        <Badge variant='outline'>
          <Clock />
          Invited
        </Badge>
      );
    },
  },
  {
    accessorKey: 'isDisabled',
    header: 'Activity',
    cell: ({ row }) => {
      if (!row.original.isDisabled) {
        return (
          <Badge
            variant='secondary'
            className='bg-green-500/20 text-green-800 border-none font-semibold'
          >
            Active
          </Badge>
        );
      }

      return <Badge variant='destructive'>Disabled</Badge>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined',
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserActionCell user={row.original} />,
  },
];

export default columns;
