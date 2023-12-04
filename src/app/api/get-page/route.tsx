import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const url = body.url;
	console.log(url);
	try {
		const data = await axios.get(url);
		return Response.json({ data: data.data });
	} catch (e) {
		 return Response.error();
	}
}
