import PocketBase from "pocketbase";

export const db = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL!);

export async function authenticate() { 
    try {
        await db.collection("_superusers").authWithPassword(
            process.env.POCKETBASE_SUPERUSER_EMAIL!,
            process.env.POCKETBASE_SUPERUSER_PASSWORD!
        );
    } catch (error) {
        console.error("PocketBase admin auth failed:", error);
    }
}