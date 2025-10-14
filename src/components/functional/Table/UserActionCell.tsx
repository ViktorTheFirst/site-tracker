import { useMemo, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

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
import { DataTable } from '@/pages/app/UsersPage/PermissionsTable/permissions-data-table';
import columns from '@/pages/app/UsersPage/PermissionsTable/permissions-columns';
import { useGetAllSites } from '@/store/siteSlice';
import { areArraysDifferent } from '@/utils/helpers';
import useUserStore, { useUpdateUser, type UserState } from '@/store/userSlice';
import { Status } from '@/interfaces/general';

const UserActionsCell = ({ user }: { user: IUser }) => {
  const [currentSelected, setCurrentSelected] = useState(user.allowedSiteIds);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  const currentUser = useUserStore((state: UserState) => state.user);
  const {
    data: sites,
    isLoading,
    isError,
    error,
  } = useGetAllSites(isPermissionsOpen);
  const { mutateAsync: editUser, isPending } = useUpdateUser();

  const canUpdate = useMemo(() => {
    return (
      areArraysDifferent(user?.allowedSiteIds, currentSelected) &&
      !!currentSelected?.length
    );
  }, [user.allowedSiteIds, currentSelected]);

  const toggleActivity = async () => {
    const permissionsUpdateRes = await editUser({
      activity: !user?.isDisabled,
      email: user.email,
      firstTimeSetup: false,
    });

    permissionsUpdateRes.status === Status.SUCCESS &&
      toast.success('Permissions set successfully!');
    permissionsUpdateRes.status === Status.FAIL &&
      toast.warning('Permissions update failed!');
  };

  const handlePermissionsChange = (selected: number[]) => {
    setCurrentSelected(selected);
  };

  const handleUpdate = async () => {
    const permissionsUpdateRes = await editUser({
      allowedSiteIds: currentSelected,
      email: user.email,
      firstTimeSetup: false,
    });

    permissionsUpdateRes.status === Status.SUCCESS &&
      toast.success('Permissions set successfully!');
    permissionsUpdateRes.status === Status.FAIL &&
      toast.warning('Permissions update failed!');
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
                disabled={
                  user.role !== Role.USER || currentUser?.role === Role.USER
                }
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
                <AlertDialogAction type='button' onClick={toggleActivity}>
                  {user.isDisabled ? 'Enable' : 'Disable'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* ---------------SITES PERMISSIONS DIALOG---------------- */}
          <AlertDialog
            open={isPermissionsOpen}
            onOpenChange={setIsPermissionsOpen}
          >
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                disabled={
                  user.role !== Role.USER || currentUser?.role === Role.USER
                }
                onSelect={(e) => e.preventDefault()}
              >
                {'Permissions'}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{`${user.name} ${
                  !user.name ? user.email : ''
                } has access to those sites`}</AlertDialogTitle>
                <AlertDialogDescription>
                  {isLoading ? (
                    <div>Loading sites...</div>
                  ) : isError ? (
                    <div>Error loading sites: {error?.message}</div>
                  ) : (
                    <DataTable
                      columns={columns}
                      data={sites?.data || []}
                      onSiteSelection={handlePermissionsChange}
                      existingAccess={user.allowedSiteIds}
                    />
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction onClick={handleUpdate} disabled={!canUpdate}>
                  Update
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserActionsCell;
