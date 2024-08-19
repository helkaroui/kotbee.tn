import db from "@/db/drizzle";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const sizeParam = req.nextUrl.searchParams.get('size')
    const size = sizeParam ? parseInt(sizeParam) : 10;

    const data = await db.query.ads.findMany({
        orderBy: (ads, {asc, desc}) => [desc(ads.createdAt)],
        with: {
            user: true
        },
        limit: size
    });

    if (!data) {
        return new NextResponse(null, { status: 404 });
    }
    
    return new NextResponse(JSON.stringify(data), {status: 200});
}
