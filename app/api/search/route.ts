import { searchAds } from "@/db/queries";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const category = req.nextUrl.searchParams.get('category');
    const subcategory = req.nextUrl.searchParams.get('subcategory');
    const page = req.nextUrl.searchParams.get('page');

    const message = await searchAds(
        category ? parseInt(category) : null,
        subcategory ? parseInt(subcategory) : null,
        req.nextUrl.searchParams.get('gouvernorat'),
        req.nextUrl.searchParams.get('delegation'),
        req.nextUrl.searchParams.get('localite'),
        req.nextUrl.searchParams.get('q'),
        page ? parseInt(page) : 1
    );

    if (!message) {
        return new NextResponse(null, { status: 404 });
    }
    
    return new NextResponse(JSON.stringify(message), {status: 200});
}
