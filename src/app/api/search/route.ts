import { env } from "@/env.mjs";
import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	// Handle the incoming request and send the response
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
	try {
		console.log(req.url);

		// Parse query and count from req.url
		const url = new URL(req.url);
		let query = url.searchParams.get('query') || "";
		let count = url.searchParams.get('count');

		const countToPass = count ? parseInt(count, 10) : 10; 

		console.log("Query:", query);
		console.log("Count:", count);

		// console.log(query, count);
		const results = await vectorStore.similaritySearchWithScore(query, countToPass);
		return Response.json({ results });
	} catch (e) {
		return Response.error();
	}
}
