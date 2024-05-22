import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CollectionState {
  collectionName: string | undefined;
  setCollectionName: (collection: string) => void;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set) => ({
      collectionName: undefined,
      setCollectionName: (collectionName) =>
        set(() => ({ collectionName: collectionName })),
    }),
    {
      name: 'collection',
    }
  )
);
