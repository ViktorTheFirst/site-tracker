import { Link } from 'react-router-dom';
import { ChevronUp, Home, LogOut, Logs, Users, UserPlus } from 'lucide-react';

import useUserStore from '@/store/userSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '../ui/sidebar';
import { Role } from '@/interfaces/user';

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
                <img
                  src='/logo.svg'
                  alt='site tracker logo'
                  width={32}
                  height={32}
                />
                <span className='text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-blue-400 to-purple-400'>
                  Site tracker
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />
      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key='home-menu-item'>
                <SidebarMenuButton asChild>
                  <Link to='/app/home' aria-disabled={false}>
                    <Home />
                    <span>Sites</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key='logs-menu-item'>
                <SidebarMenuButton asChild>
                  <Link to='/app/logs' aria-disabled={false}>
                    <Logs />
                    <span>Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* only show group to admins */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key='users-menu-item'>
                <SidebarMenuButton asChild>
                  <Link
                    to='/app/users'
                    aria-disabled={user?.role === Role.USER}
                  >
                    <Users className='mr-2 h-4 w-4' />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key='invite-user-menu-item'>
                <SidebarMenuButton asChild>
                  <Link to='/app/invite-user' aria-disabled={false}>
                    <UserPlus className='mr-2 h-4 w-4' />
                    <span>Invite User</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className='mt-auto'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className='cursor-pointer '>
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
