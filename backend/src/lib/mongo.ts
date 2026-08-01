import { MongoClient } from "mongodb";
import { env } from "../env";

const client = new MongoClient(env.MONGO_URL);

export async function connectMongo() {
    await client.connect();

    console.log("MongoDB conectado.");
}

export const mongo = client.db(env.MONGO_DB);