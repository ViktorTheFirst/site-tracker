import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useVerifyToken } from '@/store/authSlice';
import { Status } from '@/interfaces/general';
import { useUpdateUser } from '@/store/userSlice';

const FirstTimeSetupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get('token') ?? '';

  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const {
    data,
    isLoading: isVerifying,
    isError,
    error: verifyError,
  } = useVerifyToken({ token });

  const { mutateAsync: editUser, isPending } = useUpdateUser();

  const handleSubmit = async () => {
    setError('');
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      if (data?.status === Status.SUCCESS) {
        const editUserRes = await editUser({
          name,
          email: data.email,
          firstTimeSetup: true,
          password,
        });

        if (editUserRes?.status === Status.SUCCESS) {
          toast.success('Password set successfully!');
          navigate('/auth/login');
        }
      }
    } catch (err: any) {
      const msg = err?.data?.message || 'Something went wrong.';
      setError(msg);
      toast.error(msg);
    }
  };

  // Loader while checking authorization
  if (isVerifying) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-background'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
        <span className='ml-3'>Verifying your link...</span>
      </div>
    );
  }

  // Show error if unauthorized or no token
  if (!token || verifyError || data?.status !== Status.SUCCESS) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-background px-4'>
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle className='text-center text-xl text-destructive'>
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant='destructive' className='flex items-start gap-3'>
              <AlertCircle className='h-5 w-5 mt-1 text-destructive' />
              <div>
                <AlertTitle className='text-base font-semibold'>
                  Unauthorized
                </AlertTitle>
                <AlertDescription className='text-sm text-muted-foreground'>
                  {verifyError
                    ? 'Invalid or expired link. Please request a new invite.'
                    : !token
                    ? 'No token found in link. Please use the invite link sent to your email.'
                    : 'Something went wrong.'}
                </AlertDescription>
              </div>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-background px-4'>
      <Card className='w-full max-w-sm shadow-purple'>
        <CardHeader>
          <CardTitle className='text-center text-xl'>
            Set Your Password
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-5'>
          {error && (
            <Alert variant='destructive' className='flex items-start gap-3'>
              <AlertCircle className='h-5 w-5 mt-1 text-destructive' />
              <div>
                <AlertTitle className='text-base font-semibold'>
                  Something went wrong
                </AlertTitle>
                <AlertDescription className='text-sm text-muted-foreground'>
                  <ul className='list-disc list-inside'>
                    {error.split('|').map((e, i) => (
                      <li key={i}>{e.trim()}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </div>
            </Alert>
          )}

          <div className='space-y-2'>
            <label htmlFor='name' className='block text-sm font-medium'>
              Name
            </label>
            <Input
              id='name'
              type='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='password' className='block text-sm font-medium'>
              New Password
            </label>
            <Input
              id='password'
              type='password'
              placeholder='Enter new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium'
            >
              Confirm Password
            </label>
            <Input
              id='confirmPassword'
              type='password'
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            className='w-full'
            onClick={handleSubmit}
            //disabled={isLoadingCreateUser || isLoadingCreateUserFromAdmin}
          >
            Finish setup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirstTimeSetupPage;
