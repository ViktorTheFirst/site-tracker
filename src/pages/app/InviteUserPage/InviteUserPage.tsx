import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from './data-table';
import columns from './columns';
import { useGetAllSites } from '@/store/siteSlice';
import { inviteUserAPI } from '@/api/user';
import { Status } from '@/interfaces/general';

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

    invitationRes.status === Status.SUCCESS &&
      toast.success('Invite sent successfully!');
    invitationRes.status === Status.FAIL &&
      toast.error(invitationRes.message || 'Invitation failed');

    // TODO: after user added go see it in users page
  };

  const isAddUserBtnDisabled = useMemo(() => {
    return !userEmail.length || !selectedSites.length;
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
        />
        <Button
          className='ml-5'
          variant='default'
          size='default'
          onClick={handleAddUser}
          disabled={isAddUserBtnDisabled}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add user
        </Button>
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
