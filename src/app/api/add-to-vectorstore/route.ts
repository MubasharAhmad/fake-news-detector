import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
    // Placeholder route for now
	const body = await req.json();
	try {
		return Response.json({ data: "success" });
	} catch (e) {
		return Response.error();
	}
}
