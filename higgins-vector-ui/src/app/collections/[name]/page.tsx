import { UploadForm } from '@/app/components/UploadForm';
import { EmbeddingsTable } from '@/app/components/EmbeddingsTable';
import { Sidebar } from '@/app/components/Sidebar';
import { getEmbeddings } from '@/app/actions/getEmbeddings';
import { getEmbeddingsCount } from '@/app/actions/getEmbeddingsCount';

export default async function Page({ params, searchParams }: { params: { name: string }; searchParams?: { embedPage: string } }) {
  const collectionName = params.name;
  const embedPage = Number(searchParams?.embedPage) || 1;
  const embeddingsCount = await getEmbeddingsCount(collectionName);
  const embeddings = await getEmbeddings(collectionName, embedPage || 1);
  const paginationOffset = 10;
  const pageCount = Math.ceil(embeddingsCount ? embeddingsCount / paginationOffset : 1);
  console.log(embeddings?.ids?.length);
  return (
    <main className='flex min-h-screen'>
      <Sidebar />
      <div className='z-10 w-full items-start gap-8 font-mono text-sm flex p-8 flex-col'>
        <div className='flex flex-col gap-8'>
          <UploadForm />
        </div>
        {collectionName && embeddings && (
          <div className='w-full'>
            <EmbeddingsTable collectionName={collectionName} embeddings={embeddings} pageCount={pageCount} currentPage={embedPage} />
          </div>
        )}
      </div>
    </main>
  );
}
