import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const {url} = await req.json();
	console.log(url);
	try {
		const data = await axios.get(url);
		return Response.json({ data: data.data });
	} catch (e) {
		 return Response.error();
	}
}
