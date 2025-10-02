import { useGetAllUsers } from '@/store/userSlice';
import { DataTable } from './UsersTable/users-data-table';
import columns from './UsersTable/users-columns';

const AllUsersPage = () => {
  const { data: users, isLoading, isError } = useGetAllUsers();

  return (
    <div className='container mx-auto py-2'>
      <DataTable columns={columns} data={users?.data ?? []} />
    </div>
  );
};

export default AllUsersPage;
