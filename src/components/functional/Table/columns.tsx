import type { SiteStatus } from '@/interfaces/general';
import { type ColumnDef } from '@tanstack/react-table';

export interface SiteRecord {
  id?: string;
  name: string;
  address: string;

  hostingLogin: string;
  hostingPassword: string;
  hostingValiduntil: string;

  domainLogin: string;
  domainPassword: string;
  domainValiduntil: string;

  comments: string;
  status: SiteStatus;
  lastModifiedBy: string;
}

export const columns: ColumnDef<SiteRecord>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    id: 'Hosting',
    header: () => (
      <span className='bg-blue-100 text-blue-800 p-2 rounded'>Hosting</span>
    ),
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
        header: 'valid until',
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
        header: 'valid until',
      },
    ],
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'lastModifiedBy',
    header: 'Last modified by',
  },
];
