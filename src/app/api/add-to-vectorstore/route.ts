import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { QdrantClient } from "@qdrant/js-client-rest";
import { NextRequest } from "next/server";
import { Document } from "langchain/document";
import { env } from "@/env.mjs";

export async function POST(req: NextRequest) {
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
		const { text, url } = await req.json();
		console.log("Adding documents to vector store");
		const docs = new Document({ pageContent: text, metadata: { url } });
		const chunks = await splitter.splitDocuments([docs]);
		await vectorStore.ensureCollection();
		await vectorStore.addDocuments(chunks);
		console.log("Added documents to vector store");
		return Response.json({ result: "success" });
	} catch (e) {
		return Response.error();
	}
}
