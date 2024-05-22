'use client';

import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useCollectionStore } from '../hooks/useCollectionStore';
import { GetResponse } from 'chromadb';
import { useEffect, useState } from 'react';
import { getEmbeddings } from '../actions/getEmbeddings';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';

export const EmbeddingsTable = () => {
  const { collectionName } = useCollectionStore();
  const [embeddings, setEmbeddings] = useState<GetResponse | null>(null);

  useEffect(() => {
    if (collectionName) {
      getEmbeddings(collectionName).then((res) => {
        if (res && !res.error) {
          setEmbeddings(res);
        }
      });
    }
  }, [collectionName]);

  if (!collectionName) {
    return;
  }
  return (
    <Table>
      <TableCaption>
        A list of embeddings from the &apos;{collectionName}&apos; collection
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Embeddings</TableHead>
          <TableHead>Documents</TableHead>
          <TableHead className='text-right'>Metadatas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {embeddings?.ids &&
          embeddings.ids.map((embeddingId, index) => {
            return (
              <TableRow key={embeddingId}>
                <TableCell className='font-medium'>{embeddingId}</TableCell>
                {embeddings.embeddings?.at(index) ? (
                  <TableCell className=' max-w-64 text-ellipsis'>
                    {embeddings.embeddings?.at(index)}
                  </TableCell>
                ) : (
                  <TableCell className=' max-w-64 text-ellipsis'>
                    null
                  </TableCell>
                )}
                {embeddings.documents?.at(index) ? (
                  <TableCell className=' max-w-32 text-ellipsis'>
                    <Popover>
                      <PopoverTrigger>View</PopoverTrigger>
                      <PopoverContent className=' max-h-64 overflow-scroll'>
                        {embeddings.documents.at(index)}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                ) : (
                  <TableCell className=' max-w-32 text-ellipsis'>
                    Null
                  </TableCell>
                )}
                {embeddings.metadatas?.at(index) ? (
                  <TableCell className=' max-w-32 text-ellipsis'>
                    <Popover>
                      <PopoverTrigger>View</PopoverTrigger>
                      <PopoverContent className=' max-h-64 overflow-scroll'>
                        {JSON.stringify(embeddings.metadatas.at(index))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                ) : (
                  <TableCell className=' max-w-32 text-ellipsis'>
                    Null
                  </TableCell>
                )}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
