import { ChevronUp, LogOut } from 'lucide-react';

import useUserStore from '@/store/userSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '../ui/sidebar';

const AppSidebar = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const user = useUserStore((state) => state.user);

  const handleLogout = () => {
    console.log('clearing user');
    clearUser();
  };

  return (
    <Sidebar collapsible='icon'>
      {/* Sidebar Header */}
      <SidebarHeader className='py-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className='flex items-center gap-2 px-4 bg-muted'>
                <span className='text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-blue-400 to-purple-400'>
                  Site tracker
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Sidebar Footer */}
      <SidebarFooter className='mt-auto'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {user?.name} <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault(); // Prevent the menu from closing
                    handleLogout();
                  }}
                  className='text-red-500 flex items-center gap-2'
                >
                  <LogOut className='h-[1.2rem] w-[1.2rem] mr-2' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
