import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center px-4'>
      <h1 className='text-6xl font-bold text-primary mb-4'>404</h1>
      <p className='text-lg text-muted-foreground mb-6'>
        Page you are looking for doesn't exist
      </p>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );
};

export default NotFoundPage;
