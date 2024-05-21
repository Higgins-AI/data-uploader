'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import axios from 'axios';
import { CollectionType, Metadata } from 'chromadb';
import { getCollections } from '../actions/getCollections';
import { FormLabel } from '@/components/ui/form';

interface ChromaDbCollection {
  name: string;
  id: string;
  metadata: Metadata | null;
}

interface CollectionsSelectProps {
  collections: CollectionType[];
}

export const CollectionsSelect: React.FC<CollectionsSelectProps> = ({
  collections,
}) => {
  return (
    <div>
      <Select
        onValueChange={(value: string) => {
          console.log(value);
        }}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Collection' />
        </SelectTrigger>
        <SelectContent>
          {collections &&
            collections.map((collection) => {
              return (
                <SelectItem key={collection.id} value={collection.name}>
                  {collection.name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
};
