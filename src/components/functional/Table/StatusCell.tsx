import { CircleAlert, CircleCheck } from 'lucide-react';
import type { SiteStatus as SiteStatusType } from '@/interfaces/general';
import { SiteStatus } from '@/interfaces/general';

interface StatusCellProps {
  status: SiteStatusType;
}

const StatusCell = ({ status }: StatusCellProps) => {
  return (
    <div className='relative min-w-[120px] max-w-xs flex justify-center'>
      {status === SiteStatus.ACTIVE ? (
        <CircleCheck className='text-green-900' />
      ) : (
        <CircleAlert className='text-red-900' />
      )}
    </div>
  );
};

export default StatusCell;
