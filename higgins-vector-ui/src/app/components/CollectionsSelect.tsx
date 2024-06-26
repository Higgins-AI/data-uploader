'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import axios from 'axios';
import { CollectionType, Metadata } from 'chromadb';
import { getCollections } from '../actions/getCollections';
import { FormLabel } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useCollectionStore } from '../hooks/useCollectionStore';
import { getEmbeddings } from '../actions/getEmbeddings';
import { useRouter } from 'next/navigation';

interface ChromaDbCollection {
  name: string;
  id: string;
  metadata: Metadata | null;
}

interface CollectionsSelectProps {
  collections: CollectionType[];
}

export const CollectionsSelect: React.FC<CollectionsSelectProps> = ({ collections }) => {
  const { collectionName, setCollectionName } = useCollectionStore();
  const router = useRouter();
  // if (collectionName) {
  //   router.push(`/collections/${collectionName}`);
  // }
  return (
    <div>
      <Select
        onValueChange={(value: string) => {
          console.log('Collection: ' + value);
          setCollectionName(value);
          router.push(`/collections/${value}`);
        }}
      >
        <SelectTrigger className='w-48'>
          <SelectValue placeholder={collectionName || 'Collection'} defaultValue={collectionName || ''} />
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
