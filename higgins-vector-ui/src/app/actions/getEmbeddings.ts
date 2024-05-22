'use server';
import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
export async function getEmbeddings(collectionName: string) {
  try {
    const client = new ChromaClient({
      path: process.env.CHROMADB_PRO_URL,
    });
    const openAIEmbedder = new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY!,
    });
    const collection = await client.getCollection({
      name: collectionName,
      embeddingFunction: openAIEmbedder,
    });
    if (collection) {
      const embeddings = await collection.get();
      if (embeddings) {
        return embeddings;
      }
    }
    return undefined;
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
}
