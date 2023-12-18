import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { QdrantClient } from "@qdrant/js-client-rest";
import { NextRequest } from "next/server";
import { Document } from "langchain/document";
import { env } from "@/env.mjs";
import axios from "axios";


export async function POST(req: NextRequest) {
  const qdrantClient = new QdrantClient({
    apiKey: env.QDRANT_API_KEY,
    url: env.QDRANT_URL,
  });

  async function fetchData(url: string) {
    console.log(url);
    try {
      const response = await axios.get(url);
	  console.log(response.data);
      return response.data; // Return the actual data, not the entire response
    } catch (e) {
      return null; // Return null or handle the error accordingly
    }
  }

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    new OpenAIEmbeddings({ openAIApiKey: env.OPENAI_API_KEY }),
    {
      client: qdrantClient,
      collectionName: env.QDRANT_COLLECTION_NAME,
    }
  );

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 50000,
    chunkOverlap: 1000,
  });

  try {
    
	const { news , url , valid } = await req.json();
	console.log(news, url, valid);

    await vectorStore.ensureCollection();
    await vectorStore.addDocuments([{ pageContent: news, metadata: { url: url, valid: valid } }]);
	console.log("Added to vector store");
	return Response.json({ success: true });
  } catch (e) {
    console.error("Error processing request:", e);
    return Response.error();
  }
}