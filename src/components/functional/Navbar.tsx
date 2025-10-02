import { useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SidebarTrigger } from '../ui/sidebar';
import { Button } from '../ui/button';
import { useTheme } from '../ui/theme-provider';

const Navbar = () => {
  const { setTheme } = useTheme();

  const setLight = useCallback(() => setTheme('light'), [setTheme]);
  const setDark = useCallback(() => setTheme('dark'), [setTheme]);
  const setSystem = useCallback(() => setTheme('system'), [setTheme]);

  return (
    <nav className='flex p-4 items-center justify-between sticky top-0 bg-background z-10'>
      {/* LEFT */}
      <div className='flex items-center gap-3'>
        <SidebarTrigger className='cursor-pointer' />
      </div>

      {/* RIGHT */}
      <div className='flex items-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
              <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
              <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={setLight}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={setDark}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={setSystem}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
