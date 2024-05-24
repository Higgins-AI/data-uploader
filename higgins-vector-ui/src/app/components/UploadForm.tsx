'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CollectionType } from 'chromadb';
import { postDocument } from '../actions/postDocument';
import { useCollectionStore } from '../hooks/useCollectionStore';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList),
});

interface UploadFormProps {
  collections?: CollectionType[];
}

export const UploadForm: React.FC<UploadFormProps> = ({ collections }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { collectionName } = useCollectionStore();
  const { toast } = useToast();
  const router = useRouter();

  const fileRef = form.register('file');

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!collectionName) {
      console.log('No collection selected');
      toast({
        variant: 'destructive',
        description: 'No Collection Selected',
      });
      return;
    }
    if (data?.file[0]) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        async () => {
          if (reader.result) {
            postDocument(reader.result.toString(), collectionName)
              .then((res) => {
                if (res) {
                  toast({
                    description: `Document Successfully Uploaded to '${collectionName}'`,
                  });
                }
                form.setValue('file', new FileList());
                router.refresh();
              })
              .catch((error: any) => {
                console.log(error);
                toast({
                  variant: 'destructive',
                  description: 'Something went wrong',
                });
              });
          }
        },
        false
      );
      reader.readAsText(data.file[0]);
    } else {
      toast({
        variant: 'destructive',
        description: 'No File Chosen',
      });
      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type='file' placeholder='higgins-ai' {...fileRef} accept='text/plain' onChange={(event) => field.onChange(event.target.files && event.target.files[0])} />
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
