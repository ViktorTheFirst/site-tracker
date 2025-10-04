import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/utils/helpers';
import { Label } from '../ui/label';

interface MultiEmailInputProps {
  emails: string[];
  setEmails: (emails: string[]) => void;
  setError: (msg: string) => void;
  disabled?: boolean;
}

const MultiEmailInput = ({
  emails,
  setEmails,
  setError,
  disabled,
}: MultiEmailInputProps) => {
  const [input, setInput] = useState<string>('');

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') &&
      input.trim()
    ) {
      e.preventDefault();
      addEmail(input.trim());
    }
  };

  const addEmail = (email: string) => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (emails.includes(email)) {
      setError('This email has already been added.');
      return;
    }
    setEmails([...emails, email]);
    setInput('');
    setError('');
  };

  const removeEmail = (remove: string) =>
    setEmails(emails.filter((e) => e !== remove));

  return (
    <div className='w-2xl'>
      <Label className='block text-sm font-medium mb-1'>
        Invite with email (Press Enter or Tab to add):
      </Label>
      <div
        className={`
          flex items-center gap-2 border rounded-lg px-3 max-h-[48px] py-2 min-h-[48px] w-full transition-all`}
      >
        <div className='flex flex-wrap items-center gap-1 flex-1 '>
          {emails.map((email) => (
            <div
              key={email}
              className='flex items-center bg-blue-100 text-blue-800 rounded-md px-2 py-1.5 text-sm shadow-xs'
            >
              {email}
              <button
                disabled={disabled}
                type='button'
                className={`
                  ml-1 rounded-full p-0.5
                  ${
                    disabled
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:bg-blue-200 cursor-pointer'
                  }
                `}
                onClick={() => removeEmail(email)}
                tabIndex={-1} // cannot be focused using Tab
              >
                <X className='h-3 w-3' />
              </button>
            </div>
          ))}
          <Input
            type='email'
            placeholder={emails.length === 0 ? 'Enter email' : ''}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onBlur={() => {
              if (input.trim()) {
                addEmail(input.trim());
              }
            }}
            className='
              border-0 shadow-none outline-none
              px-2 py-1 h-12 text-sm flex-1 min-w-[120px] 
              focus:shadow-none focus:ring-0 dark:bg-transparent
             
            '
            style={{ boxShadow: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiEmailInput;
