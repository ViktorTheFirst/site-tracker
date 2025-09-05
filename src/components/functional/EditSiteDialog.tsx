import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SiteForm from './SIteForm';
import type { ISiteRecord } from '@/interfaces/site';

interface EditDialogProps {
  onClose: () => void;
  siteData: ISiteRecord | null;
}

const EditSiteDialog = ({ onClose, siteData }: EditDialogProps) => {
  console.log('EditSiteDialog - !!siteData', !!siteData);
  return (
    <Dialog open={!!siteData} onOpenChange={onClose}>
      <DialogContent className='min-w-2xl max-w-4xl w-full p-0'>
        <Card className='w-full max-w-2xl'>
          <CardHeader>
            <CardTitle className='text-2xl text-center flex items-center justify-center gap-2'>
              Edit site details
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <SiteForm existingSiteData={siteData} onSubmitClick={() => {}} />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default EditSiteDialog;
