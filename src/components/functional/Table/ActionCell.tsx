import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ISiteRecord } from '@/interfaces/site';
import { useDeleteSite } from '@/store/siteSlice';
import { Button } from '@/components/ui/button';
import { getLinkAddress } from '@/utils/helpers';

const ActionsCell = ({ site }: { site: ISiteRecord }) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteSite, isPending } = useDeleteSite();

  const handleDelete = async () => {
    try {
      console.log('BOUT TO DELETE THIS ', site.id);
      await deleteSite(Number(site.id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

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
        <DropdownMenuItem asChild>
          <a
            href={getLinkAddress(site.domainRegistrar)}
            target='_blank'
            rel='noopener noreferrer'
          >
            Visit domain
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={getLinkAddress(site.hostingProvider)}
            target='_blank'
            rel='noopener noreferrer'
          >
            Visit hosting
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/app/edit-site/${site.id}`)}>
          Edit site
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className='text-red-500'>
          Remove site
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
