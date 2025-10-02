import { Link } from 'react-router-dom';
import { type ColumnDef } from '@tanstack/react-table';

import { getLinkAddress, getSlimName } from '@/utils/helpers';
import type { ISiteRecord } from '@/interfaces/site';
import { Checkbox } from '@/components/ui/checkbox';

const columns: ColumnDef<ISiteRecord>[] = [
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
          className='cursor-pointer hover:bg-transparent hover:text-inherit flex'
        >
          {getSlimName(row.original.name)}
        </Link>
      );
    },
  },
];

export default columns;
