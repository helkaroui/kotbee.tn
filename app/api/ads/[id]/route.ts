import db from "@/db/drizzle";
import { ads } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(req: Request, {params}: {params: { id: number }}) {
    const data = await db.query.ads.findFirst({
        orderBy: (ads, {asc}) => [asc(ads.createdAt)],
        where: eq(ads.adId, params.id),
        with: {
            user: true
        }
    });

    if (!data) {
        return new NextResponse(null, { status: 404 });
    }
    
    return new NextResponse(JSON.stringify(data), {status: 200});
}
