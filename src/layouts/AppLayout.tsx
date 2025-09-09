import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

import Sidebar from '../components/functional/AppSidebar';
import { SidebarProvider } from '../components/ui/sidebar';
import Navbar from '@/components/functional/Navbar';

const AppLayout = () => {
  const [defaultOpen] = useState<boolean>(() => {
    const v = Cookies.get('sidebar_state');
    return v === undefined ? true : v === 'true';
  });

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
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
