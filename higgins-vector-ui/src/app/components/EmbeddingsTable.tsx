'use client';

import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useCollectionStore } from '../hooks/useCollectionStore';
import { GetResponse } from 'chromadb';
import { useEffect, useState } from 'react';
import { getEmbeddings } from '../actions/getEmbeddings';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '@/components/ui/pagination';
import { usePathname, useRouter } from 'next/navigation';

interface EmbeddingsTableProps {
  collectionName: string;
  embeddings: GetResponse | null;
  pageCount: number;
  currentPage: number;
}

export const EmbeddingsTable: React.FC<EmbeddingsTableProps> = ({ collectionName, embeddings, pageCount, currentPage }) => {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (window) {
      setUrl(window.location.toString().split('?')[0]);
    }
  }, []);
  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <Table className='w-full'>
        <TableCaption>A list of embeddings from the &apos;{collectionName}&apos; collection</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Embeddings</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Metadatas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {embeddings?.ids &&
            embeddings.ids.map((embeddingId, index) => {
              return (
                <TableRow key={embeddingId}>
                  <TableCell className='font-medium'>{embeddingId}</TableCell>
                  {embeddings.embeddings?.at(index) ? (
                    <TableCell className='max-w-64 text-ellipsis'>{embeddings.embeddings?.at(index)}</TableCell>
                  ) : (
                    <TableCell className='max-w-64 text-ellipsis'>null</TableCell>
                  )}
                  {embeddings.documents?.at(index) ? (
                    <TableCell className='max-w-32 text-ellipsis'>
                      <Popover>
                        <PopoverTrigger className='text-blue-500'>View</PopoverTrigger>
                        <PopoverContent className='max-h-64 overflow-scroll'>{embeddings.documents.at(index)}</PopoverContent>
                      </Popover>
                    </TableCell>
                  ) : (
                    <TableCell className='max-w-32 text-ellipsis'>Null</TableCell>
                  )}
                  {embeddings.metadatas?.at(index) ? (
                    <TableCell className='max-w-32 text-ellipsis'>
                      <Popover>
                        <PopoverTrigger className='text-blue-500'>View</PopoverTrigger>
                        <PopoverContent className='max-h-64 overflow-scroll'>{JSON.stringify(embeddings.metadatas.at(index))}</PopoverContent>
                      </Popover>
                    </TableCell>
                  ) : (
                    <TableCell className='max-w-32 text-ellipsis'>Null</TableCell>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`${url}?embedPage=${currentPage - 1}`} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href='#' isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage < pageCount - 2 && (
            <>
              <PaginationLink href={`${url}?embedPage=${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
              <PaginationLink href={`${url}?embedPage=${currentPage + 2}`}>{currentPage + 2}</PaginationLink>
            </>
          )}
          {currentPage < pageCount && (
            <>
              {currentPage < pageCount - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationLink href={`${url}?embedPage=${pageCount}`}>{pageCount}</PaginationLink>
              <PaginationItem>
                <PaginationNext href={`${url}?embedPage=${currentPage + 1}`} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
