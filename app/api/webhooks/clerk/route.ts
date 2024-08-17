import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    let payload: WebhookEvent;
    try {
        payload = await request.json();
    } catch (error) {
        return new NextResponse(null, { status: 500})
    }

    if (payload.type === "user.created") {
        const emails = payload.data.email_addresses;
        const primary_email_address = emails.find((email) => email.id === payload.data.primary_email_address_id);

        const phone_numbers = payload.data.phone_numbers;
        const primary_phone_number = phone_numbers.find((phone) => phone.id === payload.data.primary_phone_number_id)?.phone_number;

        await db.insert(users).values({
            userId: payload.data.id,
            firstName: payload.data.first_name,
            lastName: payload.data.last_name,
            fullName: payload.data.first_name + " " + payload.data.last_name,
            userName: payload.data.username,
            primaryEmailAddress: primary_email_address?.email_address,
            emailAddresses: emails.map((email) => email.email_address),
            primaryPhoneNumber: primary_phone_number,
            phoneNumbers: phone_numbers.map((phone) => phone.phone_number),
            imageSrc: payload.data.image_url,
            externalAccountProvider: primary_email_address?.verification?.strategy,
            externalAccountId: primary_email_address?.linked_to.at(0)?.id,
            publicMetadata: payload.data.public_metadata,
            lastSignInAt: payload.data.last_sign_in_at ? new Date(payload.data.last_sign_in_at) : null,
            raw: payload.data,
            createdAt: new Date(payload.data.created_at),
            updatedAt: new Date(payload.data.updated_at)
        });
    }

    if(payload.type === "user.updated") {
        const emails = payload.data.email_addresses;
        const primary_email_address = emails.find((email) => email.id === payload.data.primary_email_address_id);

        const phone_numbers = payload.data.phone_numbers;
        const primary_phone_number = phone_numbers.find((phone) => phone.id === payload.data.primary_phone_number_id)?.phone_number;

        await db.update(users).set({
            userId: payload.data.id,
            firstName: payload.data.first_name,
            lastName: payload.data.last_name,
            fullName: payload.data.first_name + " " + payload.data.last_name,
            userName: payload.data.username,
            primaryEmailAddress: primary_email_address?.email_address,
            emailAddresses: emails.map((email) => email.email_address),
            primaryPhoneNumber: primary_phone_number,
            phoneNumbers: phone_numbers.map((phone) => phone.phone_number),
            imageSrc: payload.data.image_url,
            externalAccountProvider: primary_email_address?.verification?.strategy,
            externalAccountId: primary_email_address?.linked_to.at(0)?.id,
            publicMetadata: payload.data.public_metadata,
            lastSignInAt: payload.data.last_sign_in_at ? new Date(payload.data.last_sign_in_at) : null,
            raw: payload.data,
            createdAt: new Date(payload.data.created_at),
            updatedAt: new Date(payload.data.updated_at)
        }).where(
            eq(users.userId, payload.data.id)
        )
    }

    return new NextResponse(null, { status: 200})
}
