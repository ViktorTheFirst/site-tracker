import { Outlet } from 'react-router-dom';

import Sidebar from '../components/functional/AppSidebar';
import { SidebarProvider } from '../components/ui/sidebar';
import Navbar from '@/components/functional/Navbar';

const AppLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className='flex min-h-screen bg-background w-full'>
        <Sidebar />
        <main className='w-full'>
          <Navbar />
          <div className='px-4'>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
