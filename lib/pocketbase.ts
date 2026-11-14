import PocketBase from "pocketbase";

const pocketbaseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL;

if (!pocketbaseUrl) {
  throw new Error("PocketBase URL is not configured");
}

export const db = new PocketBase(pocketbaseUrl);