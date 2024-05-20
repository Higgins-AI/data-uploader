import { randomUUID } from 'crypto';
import { readFile } from 'fs';
import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
import dotenv from 'dotenv';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from '@langchain/core/documents';
dotenv.config();

async function main() {
  try {
    const client = new ChromaClient({
      path: process.env.CHROMADB_PRO_URL,
    });
    const openAIEmbedder = new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY!,
    });

    const collection = await client.getOrCreateCollection({
      name: 'all-industries',
      embeddingFunction: openAIEmbedder,
    });

    readFile(
      './files/Higgins_Public_Business_Database_-_Coral_Gables_-_Parsed.txt',
      async (err, data) => {
        if (err) throw err;
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1000,
          chunkOverlap: 200,
        });

        const docOutput = await splitter.splitDocuments([
          new Document({ pageContent: data.toString() }),
        ]);

        collection
          .add({
            ids: docOutput.map((doc) => randomUUID().toString()),
            documents: docOutput.map((doc) => doc.pageContent),
            metadatas: docOutput.map((doc) => doc.metadata),
          })
          .then((res) => {
            console.log(res);
          });

        console.log(docOutput);
        // restaurantCollection
        //   .add({
        //     ids: [randomUUID()],
        //     documents: [data.toString()],
        //   })
        //   .then((res) => {
        //     console.log(res);
        //   });
      }
    );
  } catch (error) {
    console.log(error);
  }
}
main();
