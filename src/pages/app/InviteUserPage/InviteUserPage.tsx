import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from './data-table';
import columns from './columns';
import { useGetAllSites } from '@/store/siteSlice';
import { inviteUserAPI } from '@/api/user';
import { Status } from '@/interfaces/general';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const InviteUserPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [selectedSites, setSelectedSites] = useState([]);

  const { data: sites, isLoading, isError } = useGetAllSites();

  const handleAddUser = async () => {
    const invitationRes = await inviteUserAPI({
      email: userEmail,
      allowedSiteIds: selectedSites,
    });

    console.log('invitationRes', invitationRes);

    if (invitationRes.status === Status.SUCCESS) {
      toast.success('Invite sent successfully!');
      navigate('/app/users');
    }

    invitationRes.status === Status.FAIL &&
      toast.error(invitationRes.message || 'Invitation failed');
  };

  const isAddUserBtnDisabled = useMemo(() => {
    return userEmail.length < 6 || !selectedSites.length;
  }, [userEmail, selectedSites]);

  return (
    <div className='relative flex flex-col items-center justify-center h-full px-4 bg-background'>
      {/* ---------------------BACK BUTTON------------------------- */}
      <Button
        variant='ghost'
        size='sm'
        onClick={() => navigate(-1)}
        className='absolute left-4 top-4'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back
      </Button>
      <h2 className='text-2xl font-bold tracking-tight'>Invite user</h2>
      {/* ---------------------ADD USER INPUT---------------------- */}
      <div className='container mx-auto py-2 mt-10 flex flex-row justify-between'>
        <Label className='w-lg' htmlFor='user-email'>
          Enter email to grant that user access to sites bellow
        </Label>
        <Input
          id='user-email'
          name='user-email'
          type='email'
          placeholder={userEmail.length === 0 ? 'Enter email' : ''}
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className='w-lg'
          minLength={5}
          required
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <span className='block max-w-[150px] truncate cursor-default'>
              <Button
                className='ml-5'
                variant='default'
                size='default'
                onClick={handleAddUser}
                disabled={isAddUserBtnDisabled}
              >
                <Plus className='mr-2 h-4 w-4' />
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {isLoading ? 'Adding user...' : 'Add user'}
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{`${
              userEmail.length < 6 ? 'User email must be provided.' : ''
            } ${
              !selectedSites.length
                ? 'Access to at least 1 site must be granted.'
                : ''
            } ${!isAddUserBtnDisabled ? 'Sent user email invitation' : ''}`}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {/* ---------------------PERMISSIONS TABLE---------------------- */}
      <div className='container mx-auto py-2 mt-5'>
        <DataTable
          columns={columns}
          data={sites?.data ?? []}
          onSiteSelection={(selected) => setSelectedSites(selected)}
        />
      </div>
    </div>
  );
};

export default InviteUserPage;
