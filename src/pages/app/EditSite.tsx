import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import SiteForm, { addFormSchema } from '@/components/functional/SIteForm';
import { addSiteAPI } from '@/api/site';
import { Status } from '@/interfaces/general';

const EditSitePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: z.infer<typeof addFormSchema>) => {
    const editResult = await addSiteAPI(values);

    editResult.status === Status.SUCCESS && navigate('/app/home');
  };

  return (
    <div className='relative flex items-center justify-center h-full bg-background px-4'>
      {/*-----------------Back button------------------- */}
      <Button
        variant='ghost'
        size='sm'
        onClick={() => navigate(-1)}
        className='absolute left-4 top-4'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back
      </Button>
      {/*------------------------------------------------ */}
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl text-center flex items-center justify-center gap-2'>
            Edit site details
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <SiteForm existingSiteData={null} onSubmitClick={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditSitePage;
