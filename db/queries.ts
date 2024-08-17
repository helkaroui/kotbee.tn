import { ne, like, or, eq } from "drizzle-orm";
import db from "./drizzle";
import { ads, messages, replies, users } from "./schema";
import { auth } from "@clerk/nextjs/server";

export const getRecentAds = async () => {    
    return db.query.ads.findMany({
        orderBy: (ads, {asc}) => [asc(ads.createdAt)],
        with: {
            user: true
        },
        limit: 10
    });
};

export const searchAds = async (query: string) => {
    return db.query.ads.findMany({
        where: or(like(ads.title, `%${query}%`), like(ads.description, `%${query}%`)),
        with: {
            user: true
        },
        limit: 20
    });
};

export const getAdById = async (adId: number) => {
    return db.query.ads.findFirst({
        where: eq(ads.adId, adId),
        with: {
            user: true,
            cat: true,
            subCat: true
        }
    });
};


export const getUserProfile = async () => {
    const { userId } = await auth();
    if(!userId) {
        return null;
    }

    return db.query.users.findFirst({
        where: eq(users.userId, userId),
        with: {
            ads: {
                orderBy: (ads, {asc}) => [asc(ads.createdAt)]
            }
        }
    });
};

export const getUserById = async (userId: string) => {
    return db.query.users.findFirst({
        where: eq(users.userId, userId),
        with: {
            ads: {
                orderBy: (ads, {asc}) => [asc(ads.createdAt)]
            }
        }
    });
};

export const getReplyById = async (adId: number) => {
    return db.query.ads.findFirst({
        where: eq(ads.adId, adId),
        with: {
            user: true
        }
    });
};

export const getFavorites = async () => {
    const { userId } = await auth();
    if(!userId) {
        return null;
    }

    return db.query.favorites.findMany({
        where: eq(users.userId, userId),
        with: {
            ad: true
        },
        orderBy: (favorites, {asc}) => [asc(favorites.createdAt)]
    });
};


export const getReplies = async () => {
    const { userId } = await auth();
    if(!userId) {
        return null;
    }

    return db.query.replies.findMany({
        where: eq(replies.userId, userId),
        with: {
            ad: true,
            adOwner: true,
            user: true
        },
        orderBy: (replies, {asc}) => [asc(replies.createdAt)]
    });
};

export const getReplyMessages = async (replyId: number) => {
    return db.query.messages.findMany({
        where: eq(messages.replyId, replyId),
        orderBy: (messages, {asc}) => [asc(messages.createdAt)]
    });
};

export type getRepliesType = Exclude<Awaited<ReturnType<typeof getReplies>>, null>;


export const getCategories = async () => {
    return db.query.categories.findMany({
        orderBy: (categories, {asc}) => [asc(categories.title)],
        with: {
            subCategories: true
        }
    });
};

export type getCategoriesType = Awaited<ReturnType<typeof getCategories>>;


export const getNotifications = async () => {
    const { userId } = await auth();
    if(!userId) {
        return null;
    }

    return db.query.notifications.findMany({
        where: eq(users.userId, userId),
        orderBy: (notifications, {asc}) => [asc(notifications.createdAt)]
    });
};

