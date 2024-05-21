'use server';
import { ChromaClient } from 'chromadb';

export async function getCollections() {
  const client = new ChromaClient({
    path: process.env.CHROMADB_PRO_URL,
  });
  // const openAIEmbedder = new OpenAIEmbeddingFunction({
  //   openai_api_key: process.env.OPENAI_API_KEY!,
  // });
  const collections = await client.listCollections();
  if (collections) {
    return collections;
  }
  return undefined;
}
