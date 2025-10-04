import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { DataTable } from './invite-user-data-table';
import columns from './invite-user-columns';
import { useGetAllSites } from '@/store/siteSlice';
import { inviteUserAPI } from '@/api/user';
import { Status } from '@/interfaces/general';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import MultiEmailInput from '@/components/functional/MultipleEmailInput';

const InviteUserPage = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedSites, setSelectedSites] = useState([]);

  const { data: sites, isLoading, isError } = useGetAllSites();

  const handleAddUser = async () => {
    setError('');
    if (!emails.length) {
      setError('Please enter at least one email.');
      return;
    }

    const invitationRes = await inviteUserAPI({
      emails,
      allowedSiteIds: selectedSites,
    });

    if (invitationRes.status === Status.SUCCESS) {
      toast.success('Invite sent successfully!');
      setEmails([]);
      navigate('/app/users');
    }

    if (invitationRes.status === Status.FAIL) {
      const error = invitationRes.message;
      toast.error(error || 'Invitation failed');
      setError(error);
    }
  };

  const isAddUserBtnDisabled = useMemo(() => {
    return !emails.length || !selectedSites.length;
  }, [emails, selectedSites]);

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
      <div className='container mx-auto py-2 mt-10 flex flex-row justify-between items-center'>
        <MultiEmailInput
          emails={emails}
          setEmails={setEmails}
          setError={setError}
          disabled={isLoading}
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
            <p>{`${!emails.length ? 'User email must be provided.' : ''} ${
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
