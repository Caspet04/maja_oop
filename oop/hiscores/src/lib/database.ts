//import { PrismaClient as SqliteClient } from "@prisma/shared_client/sqlite_client";
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function connect(): Promise<MongoClient> {
    if (client == null) {
        client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    }
    return client;
}

//export const sqliteClient = new SqliteClient();
