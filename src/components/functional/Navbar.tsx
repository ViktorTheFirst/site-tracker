import { SidebarTrigger } from '../ui/sidebar';

const Navbar = () => {
  return (
    <nav className='flex p-4 items-center justify-between sticky top-0 bg-background z-10'>
      {/* LEFT */}
      <div className='flex items-center gap-3'>
        <SidebarTrigger />
      </div>
    </nav>
  );
};

export default Navbar;
