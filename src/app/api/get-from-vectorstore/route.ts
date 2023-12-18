import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { QdrantClient } from "@qdrant/js-client-rest";
import { NextRequest } from "next/server";
import { env } from "@/env.mjs";


export async function GET(req: NextRequest) {
    const qdrantClient = new QdrantClient({
        apiKey: env.QDRANT_API_KEY,
        url: env.QDRANT_URL,
    });


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
        console.log("Getting all documents");
        await vectorStore.ensureCollection();

        const allDocuments = await vectorStore.similaritySearch(
            "",
            10,
        );   
        
        console.log(allDocuments);

        return Response.json({ success: true, allDocuments });
    }
    catch (e) {
        console.error("Error processing request:", e);
        return Response.json({ success: false });
    }

}