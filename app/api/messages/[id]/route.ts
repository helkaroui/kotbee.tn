import { getReplyMessages } from "@/db/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: { id: number }}) {
    const message = await getReplyMessages(params.id);

    if (!message) {
        return new NextResponse(null, { status: 404 });
    }
    
    return new NextResponse(JSON.stringify(message), {status: 200});
}
