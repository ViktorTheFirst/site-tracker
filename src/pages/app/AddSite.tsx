import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const AddSitePage = () => {
  const navigate = useNavigate();
  //const isEdit = useMemo(() => Boolean(id), [id]);

  const [submitError, setSubmitError] = useState<string>('');

  const handleSubmit = () => {};

  return (
    <div className='relative flex items-center justify-center h-full bg-background px-4'>
      {/* Back button */}
      <Button
        variant='ghost'
        size='sm'
        onClick={() => navigate(-1)}
        className='absolute left-4 top-4 cursor-pointer'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back
      </Button>
      <Card className='w-full max-w-xl'>
        <CardHeader>
          <CardTitle className='text-2xl text-center flex items-center justify-center gap-2'>
            Card Title
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddSitePage;
