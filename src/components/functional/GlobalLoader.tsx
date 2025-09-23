import { Loader2 } from 'lucide-react';

const GlobalLoader = () => {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/50 z-50'>
      <Loader2 className='w-8 h-8 animate-spin text-muted-foreground' />
      <span className='text-muted-foreground font-medium'>Loading...</span>
    </div>
  );
};

export default GlobalLoader;
