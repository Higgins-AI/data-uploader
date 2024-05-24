import { UploadForm } from './components/UploadForm';
import { EmbeddingsTable } from './components/EmbeddingsTable';
import { Sidebar } from './components/Sidebar';
import { getEmbeddings } from './actions/getEmbeddings';

export default async function Home() {
  // const embeddings = await getEmbeddings();
  return (
    <main className='flex min-h-screen'>
      <Sidebar />
      <div className='z-10 w-full items-start gap-8 justify-between font-mono text-sm flex p-8 flex-col'>
        <div className='flex flex-col gap-8'>
          <UploadForm />
        </div>
        {/* <div className=' flex-1'>
          <EmbeddingsTable />
        </div> */}
      </div>
    </main>
  );
}
