import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/pages/app/HomePage/home-data-table';

import columns from '@/pages/app/HomePage/home-columns';
import { useGetAllSites } from '@/store/siteSlice';
import type { AxiosError } from 'axios';
import useUserStore from '@/store/userSlice';

// TODO:
// 1. create a checkbox in SiteForm "domain and hosting in same place"
// by checking it domain gets disabled with same values as hosting already filled
// 3. add toasts for site adding, editing and deletion

const HomePage = () => {
  const clearGlobalUser = useUserStore((state) => state.clearUser);
  const { data: sites, isLoading, isError, error } = useGetAllSites();
  const navigate = useNavigate();

  if (
    isError &&
    ((error as AxiosError)?.status === 401 ||
      (error as AxiosError)?.status === 403)
  ) {
    clearGlobalUser();
    navigate('/auth/login');
  }

  return (
    <div className='container mx-auto py-2'>
      <DataTable columns={columns} data={sites?.data ?? []} />
    </div>
  );
};

export default HomePage;
