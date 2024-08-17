import cloudinary from "@/db/cdn";
import db from "@/db/drizzle";
import { ads } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData();
    const user = await auth();

    if (!user || !user.userId) {
        return new NextResponse(null, {status: 401});
    }

    const images = data.getAll("images").map((image) => image as File);

    var uploadedImages = [];
    for (const image of images) {
        try {
          const b64 = Buffer.from((await image.arrayBuffer())).toString("base64");
          let dataURI = "data:" + image.type + ";base64," + b64;
          const response = await cloudinary.uploader.upload(dataURI, {
            folder: "kotbee-tn-images-ads",
            resource_type: "image",
            access_mode: "public",
            eager: [{ width: 400, height: 400, crop: "scale", fetch_format: "auto" }],
          });
          uploadedImages.push(response.secure_url);
        } catch (error) {
            console.error(error);
            return new NextResponse(null, {status: 400});
        }
    }

    try {
        const res = await db.insert(ads).values({
            userId: user.userId,
            title: data.get("title")?.toString() || "",
            description: data.get("description")?.toString() || "",
            category: Number(data.get("categoryId")?.toString()) || 0,
            subCategory: Number(data.get("subCategoryId")?.toString()) || 0,
            gouvernorat: data.get("gouvernorat")?.toString() || "",
            delegation: data.get("delegation")?.toString() || "",
            localite: data.get("localite")?.toString() || "",
            showPhoneNumber: data.get("showPhone") === "true",
            images: uploadedImages,
        }).returning()
        return new NextResponse(JSON.stringify(res[0]), {status: 200});
    }
    catch (error) {
        console.error(error);
        return new NextResponse(null, {status: 500});
    }
}
