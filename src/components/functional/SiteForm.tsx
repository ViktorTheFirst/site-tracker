import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from './DatePicker';
import { Switch } from '@/components/ui/switch';
import { Label } from '../ui/label';
import type { ISiteRecord } from '@/interfaces/site';
import { useEffect } from 'react';

export const addFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(255),
  hostingProvider: z
    .string()
    .transform((val) =>
      val && !/^https?:\/\//.test(val) ? `https://${val}` : val
    )
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: 'Must be a valid URL',
    })
    .optional(),
  hostingLogin: z.string().max(100).optional(),
  hostingPassword: z.string().max(100).optional(),
  hostingValiduntil: z.date('Must be a valid date').optional(),

  domainRegistrar: z
    .string()
    .transform((val) =>
      val && !/^https?:\/\//.test(val) ? `https://${val}` : val
    )
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: 'Must be a valid URL',
    })
    .optional(),
  domainLogin: z.string().max(100).optional(),
  domainPassword: z.string().max(100).optional(),
  domainValiduntil: z.date('Must be a valid date').optional(),

  comments: z.string().max(1000),
  status: z.enum(['active', 'inactive']),
});

interface SiteFormProps {
  existingSiteData: ISiteRecord | null;
  onSubmitClick: (values: z.infer<typeof addFormSchema>) => void;
}

const SiteForm = ({ onSubmitClick, existingSiteData }: SiteFormProps) => {
  const form = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      id: undefined,
      name: '',
      hostingProvider: '',
      hostingLogin: '',
      hostingPassword: '',
      hostingValiduntil: new Date(),
      domainRegistrar: '',
      domainLogin: '',
      domainPassword: '',
      domainValiduntil: new Date(),
      comments: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (existingSiteData) {
      form.reset({
        id: existingSiteData.id?.toString(),
        name: existingSiteData.name || '',
        hostingProvider: existingSiteData.hostingProvider || '',
        hostingLogin: existingSiteData.hostingLogin || '',
        hostingPassword: existingSiteData.hostingPassword || '',
        hostingValiduntil: existingSiteData.hostingValiduntil
          ? new Date(existingSiteData.hostingValiduntil)
          : new Date(),
        domainRegistrar: existingSiteData.domainRegistrar || '',
        domainLogin: existingSiteData.domainLogin || '',
        domainPassword: existingSiteData.domainPassword || '',
        domainValiduntil: existingSiteData.domainValiduntil
          ? new Date(existingSiteData.domainValiduntil)
          : new Date(),
        comments: existingSiteData.comments || '',
        status: existingSiteData.status || 'active',
      });
    }
  }, [existingSiteData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitClick)} className='space-y-5'>
        <div className='form-row'>
          <Label htmlFor='name'>Website address</Label>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id='name'
                    className='min-w-[320px]'
                    placeholder='Website address'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* ------------------------------HOSTING----------------------------- */}
        <div className='form-row'>
          <Label htmlFor='hosting-provider'>Url of hosting provider</Label>
          <FormField
            control={form.control}
            name='hostingProvider'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id='hosting-provider'
                    className='min-w-[320px]'
                    placeholder='Url of hosting provider'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='form-row'>
          <Label htmlFor='hosting-login'>Hosting login email/nickname</Label>
          <FormField
            control={form.control}
            name='hostingLogin'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id='hosting-login'
                    className='min-w-[320px]'
                    placeholder='Hosting login email/nickname'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='form-row'>
          <Label htmlFor='hosting-password'>Hosting password</Label>
          <FormField
            control={form.control}
            name='hostingPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id='hosting-password'
                    type='password'
                    placeholder='Hosting password'
                    className='min-w-[320px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='form-row'>
          <Label htmlFor='hosting'>Insert hosting expiration date</Label>
          <FormField
            control={form.control}
            name='hostingValiduntil'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    id='hosting'
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* ------------------------------DOMAIN----------------------------- */}
        <div className='form-row'>
          <Label htmlFor='domainRegistrar'>Url of domain registrar</Label>
          <FormField
            control={form.control}
            name='domainRegistrar'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id='domainRegistrar'
                    placeholder='Url of domain registrar'
                    className='min-w-[320px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='form-row'>
          <Label htmlFor='domainLogin'>Domain login email/nickname</Label>
          <FormField
            control={form.control}
            name='domainLogin'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id='domainLogin'
                    placeholder='Domain login email/nickname'
                    className='min-w-[320px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='form-row'>
          <Label htmlFor='domainPassword'>Domain password</Label>
          <FormField
            control={form.control}
            name='domainPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id='domainPassword'
                    type='password'
                    placeholder='Domain password'
                    className='min-w-[320px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='form-row'>
          <Label htmlFor='domain'>Insert domain expiration date</Label>
          <FormField
            control={form.control}
            name='domainValiduntil'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    id='domain'
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* ------------------------------------------------------------------ */}
        <FormField
          control={form.control}
          name='comments'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder='Anything important to note' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='form-row'>
          <Label htmlFor='domain'>Set current website status</Label>
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center space-x-2'>
                    <Label htmlFor='inactive'>Inactive</Label>
                    <Switch
                      checked={field.value === 'active'}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? 'active' : 'inactive')
                      }
                    />
                    <Label htmlFor='active'>Active</Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end'>
          <Button
            variant='destructive'
            type='button'
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button className='ml-2' type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SiteForm;
