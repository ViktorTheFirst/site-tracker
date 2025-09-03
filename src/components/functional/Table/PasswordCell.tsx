import { useState } from 'react';
import { Eye } from 'lucide-react';

interface PasswordCellProps {
  value: string;
}

const PasswordCell = ({ value }: PasswordCellProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className='relative min-w-[120px] max-w-xs flex justify-center'>
      {show ? (
        value
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
