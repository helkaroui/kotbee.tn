import db from "@/db/drizzle";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: { id: number }}) {
    const data = await db.query.ads.findFirst({
        orderBy: (ads, {asc}) => [asc(ads.createdAt)],
        where: {
            adId: params.id
        },
        with: {
            user: true
        },
        limit: 10
    });

    if (!data || data.length === 0) {
        return new NextResponse(null, { status: 404 });
    }
    
    return new NextResponse(JSON.stringify(data[0]), {status: 200});
}
