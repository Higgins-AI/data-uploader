'use server';

import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
import { randomUUID } from 'crypto';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from '@langchain/core/documents';

export async function postDocument(document: string, collectionName: string) {
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
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docOutput = await splitter.splitDocuments([
      new Document({ pageContent: document }),
    ]);

    const addResponse = await collection.add({
      ids: docOutput.map(() => randomUUID().toString()),
      documents: docOutput.map((doc) => doc.pageContent),
      metadatas: docOutput.map((doc) => doc.metadata),
    });
    if (addResponse) {
      console.log(addResponse);
      return addResponse;
    }
    return undefined;
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
}
