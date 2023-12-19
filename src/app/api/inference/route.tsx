import { NextRequest } from "next/server";
import { env } from "@/env.mjs";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";

export async function POST(req: NextRequest) {
    console.log(env.OPENAI_API_KEY);
	const model = new ChatOpenAI({
        openAIApiKey: "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",
		temperature: 0.9,
		modelName: "ft:gpt-3.5-turbo-1106:ir-project-org::8XMK0Zpc",
	});
	try {
		const { news } = await req.json();
		console.log(news);
        const response = await model.call([new SystemMessage(news as string), new HumanMessage("Is this true?")]);
        console.log(response);
		return Response.json({ result: response.content });
	} catch (e) {
		console.error("Error processing request:", e);
		return Response.error();
	}
}
