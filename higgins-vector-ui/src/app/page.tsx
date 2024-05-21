import { UploadForm } from './components/UploadForm';
import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
import { getCollections } from './actions/getCollections';
import axios from 'axios';
import { CollectionsSelect } from './components/CollectionsSelect';

export default async function Home() {
  const collections = await getCollections();
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-start gap-8 justify-between font-mono text-sm flex flex-col'>
        {/* {collections && <CollectionsSelect collections={collections} />} */}
        {collections && <UploadForm collections={collections} />}
      </div>
    </main>
  );
}
