import { relations, sql } from "drizzle-orm";
import { pgTable, text, pgEnum, timestamp, jsonb, date, boolean, serial, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    userId: text("user_id").primaryKey(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    fullName: text("full_name"),
    userName: text("user_name"),
    dob: date("dob"),
    primaryEmailAddress: text("primary_email_address"),
    emailAddresses: text("email_addresses").array().default(sql`'{}'::text[]`),
    primaryPhoneNumber: text("primary_phone_number"),
    phoneNumbers: text("phone_numbers").array().default(sql`'{}'::text[]`),
    imageSrc: text("image_src"),
    externalAccountProvider: text("external_account_provider"),
    externalAccountId: text("external_account_id"),
    publicMetadata: jsonb("public_metadata").default(sql`'{}'::jsonb`),
    lastSignInAt: timestamp("last_sign_in_at"),
    raw: jsonb("raw"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull()
});

export const ads = pgTable("ads", {
    adId: serial("ad_id").notNull().primaryKey(),
    title: text("title"),
    description: text("description"),
    category: integer("category").references(() => categories.id, { onDelete: "cascade" }),
    subCategory: integer("sub_category").references(() => subCategories.id, { onDelete: "cascade" }),
    gouvernorat: text("gouvernorat").notNull(),
    delegation: text("delegation").notNull(),
    localite: text("localite").notNull(),
    postalCode: text("postal_code"),
    images: text("images").array().default(sql`'{}'::text[]`),
    userId: text("user_id").references(() => users.userId, { onDelete: "cascade" }).notNull(),
    showPhoneNumber: boolean("show_phone_number").default(false),
    isActive: boolean("is_active").default(true),
    isDeleted: boolean("is_deleted").default(false),
    createdAt: timestamp("created_at").notNull().default(sql`now()`),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at")
});

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    title: text("name").notNull(),
    icon: text("icon"),
    subCategoryTitle: text("sub_category_title"),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
});

export const subCategories = pgTable("sub_categories", {
    id: serial("id").primaryKey(),
    title: text("name").notNull(),
    categoryId: integer("category_id").references(() => categories.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
});

export const categoriesRelations = relations(categories, ({one, many}) => ({
    subCategories: many(subCategories),
    ads: many(ads)
}));

export const subCategoriesRelations = relations(subCategories, ({one, many}) => ({
    category: one(categories, {fields: [subCategories.categoryId], references: [categories.id]}),
    ads: many(ads)
}));

export const adsRelations = relations(ads, ({one, many}) => ({
    user: one(users, {fields: [ads.userId], references: [users.userId]}),
    cat: one(categories, {fields: [ads.category], references: [categories.id]}),
    subCat: one(subCategories, {fields: [ads.subCategory], references: [subCategories.id]}),
}));

export const usersRelations = relations(users, ({one, many}) => ({
    ads: many(ads)
}));

export const reportsEnum = pgEnum("reports_enum", ["spam", "inappropriate", "other"]);

export const reports = pgTable("reports", {
    reportId: serial("report_id").primaryKey(),
    adId: integer("ad_id").references(() => ads.adId, { onDelete: "cascade" }).notNull(),
    userId: text("user_id").references(() => users.userId, { onDelete: "cascade" }).notNull(),
    reason: reportsEnum("reason").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
});

export const reportsRelations = relations(reports, ({one, many}) => ({
    user: one(users, {fields: [reports.userId], references: [users.userId]}),
    ad: one(ads, {fields: [reports.adId], references: [ads.adId]}),
}));

export const favorites = pgTable("favorites", {
    favoriteId: serial("favorite_id").primaryKey(),
    adId: integer("ad_id").references(() => ads.adId, { onDelete: "cascade" }).notNull(),
    userId: text("user_id").references(() => users.userId, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
});

export const favoritesRelations = relations(favorites, ({one, many}) => ({
    user: one(users, {fields: [favorites.userId], references: [users.userId]}),
    ad: one(ads, {fields: [favorites.adId], references: [ads.adId]}),
}));

export const replies = pgTable("replies", {
    replyId: serial("reply_id").primaryKey(),
    adId: integer("ad_id").references(() => ads.adId, { onDelete: "cascade" }).notNull(),
    userId: text("user_id").references(() => users.userId, { onDelete: "cascade" }).notNull(),
    adOwnerId: text("counterparty_id").references(() => users.userId, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
});

export const repliesRelations = relations(replies, ({one, many}) => ({
    user: one(users, {fields: [replies.userId], references: [users.userId]}),
    ad: one(ads, {fields: [replies.adId], references: [ads.adId]}),
    adOwner: one(users, {fields: [replies.adOwnerId], references: [users.userId]}),
    messages: many(messages),
}));

export const messages = pgTable("messages", {
    messageId: serial("message_id").primaryKey(),
    replyId: integer("reply_id").references(() => replies.replyId, { onDelete: "cascade" }),
    senderId: text("sender_id").references(() => users.userId, { onDelete: "cascade" }).notNull(),
    receiverId: text("receiver_id").references(() => users.userId, { onDelete: "cascade" }).notNull(),
    content: text("content").notNull(),
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
});

export const messagesRelations = relations(messages, ({one, many}) => ({
    sender: one(users, {fields: [messages.senderId], references: [users.userId]}),
    receiver: one(users, {fields: [messages.receiverId], references: [users.userId]}),
    reply: one(replies, {fields: [messages.replyId], references: [replies.replyId]}),
}));

export const notifications = pgTable("notifications", {
    notificationId: serial("notification_id").primaryKey(),
    userId: text("user_id").references(() => users.userId, { onDelete: "cascade" }).notNull(),
    content: text("content").notNull(),
    isRead: boolean("is_read").default(false),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
});

export const notificationsRelations = relations(notifications, ({one, many}) => ({
    user: one(users, {fields: [notifications.userId], references: [users.userId]}),
}));

export const searchHistory = pgTable("search_history", {
    searchHistoryId: text("search_history_id").primaryKey(),
    userId: text("user_id").references(() => users.userId, { onDelete: "cascade" }).notNull(),
    query: text("query").notNull(),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
});

export const searchHistoryRelations = relations(searchHistory, ({one, many}) => ({
    user: one(users, {fields: [searchHistory.userId], references: [users.userId]}),
}));
