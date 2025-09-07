import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SiteForm, { addFormSchema } from '@/components/functional/SiteForm';
import { Status } from '@/interfaces/general';
import { useGetSiteById, useUpdateSite } from '@/store/siteSlice';

const EditSitePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: siteData, isLoading, isError } = useGetSiteById(id || '');
  const { mutateAsync: editSite, isPending } = useUpdateSite();

  const handleSubmit = async (values: z.infer<typeof addFormSchema>) => {
    try {
      const editResult = await editSite(values);
      editResult.status === Status.SUCCESS && navigate('/app/home');
    } catch (error) {
      console.error('Failed to edit site:', error);
      // Optionally show a toast notification here
    }
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
          <SiteForm
            existingSiteData={siteData?.data ?? null}
            onSubmitClick={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditSitePage;
