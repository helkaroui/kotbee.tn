import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

import adsData from "./seed/ads.json";
import users from "./seed/users.json";
import replies from "./seed/replies.json";
import messages from "./seed/messages.json";
import categories from "./seed/categories.json";
import sub_categories from "./seed/sub_categories.json";


const sql = neon(process.env.DB_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database...");
        await db.delete(schema.users);
        await db.delete(schema.ads);
        await db.delete(schema.replies);
        await db.delete(schema.messages);
        await db.delete(schema.categories);
        await db.delete(schema.subCategories);


        await db.insert(schema.categories).values(categories.map((category) => ({
            ...category,
            createdAt: new Date(category.createdAt)
        })));

        await db.insert(schema.subCategories).values(sub_categories.map((subCategory) => ({
            ...subCategory,
            createdAt: new Date(subCategory.createdAt)
        })));

        await db.insert(schema.users).values(users.map((user) => ({
            ...user,
            lastSignInAt: new Date(user.lastSignInAt),
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
        })));

        await db.insert(schema.ads).values(adsData.map((ad) => ({
            ...ad,
            createdAt: new Date(ad.createdAt),
            updatedAt: new Date(ad.updatedAt),
        })));

        await db.insert(schema.replies).values(replies.map((reply) => ({
            ...reply,
            createdAt: new Date(reply.createdAt)
        })));

        await db.insert(schema.messages).values(messages.map((message) => ({
            ...message,
            createdAt: new Date(message.createdAt)
        })));

        console.log("Seed complete successfully!")
    } catch (err) {
        console.error(err);
        throw new Error("Failed to connect to database");
    }
}

main();