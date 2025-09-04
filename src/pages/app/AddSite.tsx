import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import AddSiteForm, {
  addFormSchema,
} from '@/components/functional/AddSIteForm';
import { addSiteAPI } from '@/api/site';

const AddSitePage = () => {
  const navigate = useNavigate();
  //const isEdit = useMemo(() => Boolean(id), [id]);

  const [submitError, setSubmitError] = useState<string>('');

  const handleSubmit = async (values: z.infer<typeof addFormSchema>) => {
    console.log('values in handleSubmit', values);
    const addResult = await addSiteAPI(values);
  };

  return (
    <div className='relative flex items-center justify-center h-full bg-background px-4'>
      {/* Back button */}
      <Button
        variant='ghost'
        size='sm'
        onClick={() => navigate(-1)}
        className='absolute left-4 top-4'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back
      </Button>
      <Card className='w-full max-w-xl'>
        <CardHeader>
          <CardTitle className='text-2xl text-center flex items-center justify-center gap-2'>
            Add site information
          </CardTitle>
          <CardDescription>
            Please try to fill every possible field
          </CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className='space-y-4'>
          <AddSiteForm onSubmitClick={handleSubmit} />
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default AddSitePage;
