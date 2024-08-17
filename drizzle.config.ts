import "dotenv/config";

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: "./db/schema.ts",
    dialect: 'postgresql',
    strict: true,
    
    dbCredentials : {
        user: process.env.DB_USER!,
        host: process.env.DB_HOST!,
        database: process.env.DB_NAME!,
        password: process.env.DB_PASSWORD!,
        port: Number(process.env.DB_PORT!),
    }
})
