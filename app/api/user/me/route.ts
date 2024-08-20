import { getUserProfile } from "@/db/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const message = await getUserProfile();

    if (!message) {
        return new NextResponse(null, { status: 404 });
    }
    
    return new NextResponse(JSON.stringify(message), {status: 200});
}
