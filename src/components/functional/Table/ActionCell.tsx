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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { ISiteRecord } from '@/interfaces/site';
import { useDeleteSite } from '@/store/siteSlice';
import { Button } from '@/components/ui/button';
import { getLinkAddress } from '@/utils/helpers';

const ActionsCell = ({ site }: { site: ISiteRecord }) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteSite, isPending } = useDeleteSite();

  const handleDelete = async () => {
    try {
      await deleteSite(Number(site.id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
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
          <DropdownMenuItem
            onClick={() => navigate(`/app/edit-site/${site.id}`)}
          >
            Edit site
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className='text-red-500'
              >
                Delete site
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  {`This action will remove record for site ${site.name}`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type='button' onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionsCell;
