import { UploadForm } from './components/UploadForm';
import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
import { getCollections } from './actions/getCollections';
import axios from 'axios';
import { CollectionsSelect } from './components/CollectionsSelect';
import { EmbeddingsTable } from './components/EmbeddingsTable';

export default async function Home() {
  const collections = await getCollections();
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-start gap-8 justify-between font-mono text-sm flex'>
        <div className='flex flex-col gap-8'>
          {collections && <CollectionsSelect collections={collections} />}
          <UploadForm />
        </div>
        <div className=' flex-1'>
          <EmbeddingsTable />
        </div>
      </div>
    </main>
  );
}
