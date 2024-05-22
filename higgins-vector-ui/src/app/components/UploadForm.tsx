'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from '@langchain/core/documents';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { CollectionType } from 'chromadb';
import { postDocument } from '../actions/postDocument';
import { useCollectionStore } from '../hooks/useCollectionStore';
import { useToast } from '@/components/ui/use-toast';

const ACCEPTED_FILE_TYPES = ['text/plain'];
const formSchema = z.object({
  file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList),
});

interface UploadFormProps {
  collections?: CollectionType[];
}

export const UploadForm: React.FC<UploadFormProps> = ({ collections }) => {
  // firstName and lastName will have correct type

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { collectionName } = useCollectionStore();
  const { toast } = useToast();

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

      // const reader = new FileReader();
      // reader.addEventListener(
      //   'load',
      //   async () => {
      //     if (reader.result) {
      //       const splitter = new RecursiveCharacterTextSplitter({
      //         chunkSize: 1000,
      //         chunkOverlap: 200,
      //       });

      //       const docOutput = await splitter.splitDocuments([
      //         new Document({ pageContent: reader.result?.toString() }),
      //       ]);

      //     }
      //   },
      //   false
      // );
      // reader.readAsText(data.file[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* {collections && (
          <FormField
            control={form.control}
            name='collection'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a collection' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {collections.map((collection) => {
                      return (
                        <SelectItem key={collection.id} value={collection.name}>
                          {collection.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        )} */}

        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  placeholder='higgins-ai'
                  {...fileRef}
                  accept='text/plain'
                  onChange={(event) =>
                    field.onChange(event.target.files && event.target.files[0])
                  }
                />
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
