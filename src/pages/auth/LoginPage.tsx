import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginAPI } from '@/api/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    try {
      const res = await loginAPI({ email, password });
    } catch (err: any) {
      console.warn('Error in handle login', err);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-background px-4'>
      <Card className='w-full max-w-sm '>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Login</CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='block text-sm font-medium'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='block text-sm font-medium'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <Button onClick={handleLogin} type='button' className='w-full'>
            Log In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
