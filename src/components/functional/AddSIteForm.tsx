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

export const addFormSchema = z.object({
  name: z.string().min(2).max(255),
  hostingProvider: z.url('Must be a valid URL'),
  hostingLogin: z.string().min(2).max(100),
  hostingPassword: z.string().min(6).max(100),
  hostingValiduntil: z.date('Must be a valid date'),

  domainRegistrar: z.url('Must be a valid URL'),
  domainLogin: z.string().min(2).max(100),
  domainPassword: z.string().min(6).max(100),
  domainValiduntil: z.date('Must be a valid date'),

  comments: z.string().max(1000),
  status: z.enum(['active', 'inactive']),
});

interface AddSiteFormProps {
  onSubmitClick: (values: z.infer<typeof addFormSchema>) => void;
}

const AddSiteForm = ({ onSubmitClick }: AddSiteFormProps) => {
  const form = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
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

  /* const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }; */

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitClick)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Website address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ------------------------------HOSTING----------------------------- */}
        <FormField
          control={form.control}
          name='hostingProvider'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Url of hosting provider' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='hostingLogin'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Hosting login email/nickname' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='hostingPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Hosting password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {/* ------------------------------DOMAIN----------------------------- */}
        <FormField
          control={form.control}
          name='domainRegistrar'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Url of domain registrar' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='domainLogin'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Domain login email/nickname' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='domainPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Domain password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default AddSiteForm;
