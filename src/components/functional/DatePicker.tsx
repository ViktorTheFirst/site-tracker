import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

interface DatePickerProps {
  id: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

const DatePicker = ({ value, onChange, id }: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id='domain-date-pop-trigger' asChild>
        <Button
          variant='outline'
          id={`${id}-date-button`}
          className='w-48 justify-between font-normal'
        >
          <span className='flex w-full items-center justify-between'>
            {value ? value.toLocaleDateString('en-GB') : 'Select date'}
            <ChevronDownIcon />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
        <Calendar
          mode='single'
          selected={value}
          captionLayout='dropdown'
          startMonth={new Date()}
          endMonth={new Date(2055, 12)}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
