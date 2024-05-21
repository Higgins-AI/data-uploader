import { ChromaClient } from 'chromadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const client = new ChromaClient({
    path: process.env.CHROMADB_PRO_URL,
  });

  const collections = await client.listCollections();
  if (collections) {
    console.log(collections);
    return Response.json(collections);
  }
  console.log('fail');
  return Response.json({ ok: false });
}
