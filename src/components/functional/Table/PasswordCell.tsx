import { useState } from 'react';
import { Eye } from 'lucide-react';
import { NO_DATA } from '@/utils/constants';

interface PasswordCellProps {
  value: string;
}

const PasswordCell = ({ value }: PasswordCellProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className='relative min-w-[120px] max-w-xs flex justify-center'>
      {show ? (
        value || NO_DATA
      ) : (
        <Eye
          size={16}
          onClick={() => setShow(true)}
          className='cursor-pointer'
        />
      )}
    </div>
  );
};

export default PasswordCell;
