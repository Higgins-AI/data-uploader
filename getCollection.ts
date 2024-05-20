// import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';

// async function main() {
//   const client = new ChromaClient({
//     path: process.env.CHROMADB_PRO_URL,
//   });
//   const openAIEmbedder = new OpenAIEmbeddingFunction({
//     openai_api_key:,
//   });
//   const collection = await client.getCollection({
//     name: 'restaurant',
//     embeddingFunction: openAIEmbedder,
//   });
//   const documents = await collection.query({
//     queryTexts: ['restaurant supplier'],
//   });

//   console.log(documents);
// }
// main();
