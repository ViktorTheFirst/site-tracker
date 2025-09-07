import { DataTable } from '@/pages/app/HomePage/data-table';

import columns from '@/pages/app/HomePage/columns';
import { useGetAllSites } from '@/store/siteSlice';

// TODO:
// 1. create a checkbox in SiteForm "domain and hosting in same place"
// by checking it domain gets disabled with same values as hosting already filled
// 2. add modal to ask user if he wants to delete site
// 3. add toasts for site adding, editing and deletion

const HomePage = () => {
  const { data: sites, isLoading, isError } = useGetAllSites();

  return (
    <div className='container mx-auto py-2'>
      <DataTable columns={columns} data={sites?.data ?? []} />
    </div>
  );
};

export default HomePage;
