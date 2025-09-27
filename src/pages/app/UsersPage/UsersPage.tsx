import { useGetAllUsers } from '@/store/userSlice';
import { DataTable } from './data-table';
import columns from './columns';

const AllUsersPage = () => {
  const { data: users, isLoading, isError } = useGetAllUsers();

  console.log('users in users page', users);

  return (
    <div className='container mx-auto py-2'>
      <DataTable columns={columns} data={users?.data ?? []} />
    </div>
  );
};

export default AllUsersPage;
