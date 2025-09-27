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
import { Button } from '@/components/ui/button';
import { Role, type IUser } from '@/interfaces/user';

const SiteActionsCell = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();
  //const { mutateAsync: deleteSite, isPending } = useDeleteSite();

  const handleDelete = async () => {
    try {
      //await deleteSite(Number(site.id));
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

          <DropdownMenuSeparator />
          {/* ---------------DISABLE DIALOG---------------- */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                disabled={user.role !== Role.USER}
                className={`${
                  user.isDisabled ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {user.isDisabled ? 'Enable user' : 'Disable user'}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  {`This action will ${
                    user.isDisabled ? 'enable' : 'disable'
                  } user ${user.name}, ${user.email}`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type='button' onClick={handleDelete}>
                  {user.isDisabled ? 'Enable' : 'Disable'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* ---------------LIST OF ACCESS SITES DIALOG---------------- */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                disabled={user.role !== Role.USER}
                onSelect={(e) => e.preventDefault()}
              >
                {'See list of access'}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{`${user.name} ${user.email} has access to those sites`}</AlertDialogTitle>
                <AlertDialogDescription>
                  {(user?.allowedSiteIds || []).map((item: number) => {
                    return <div>{item}</div>;
                  })}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SiteActionsCell;
