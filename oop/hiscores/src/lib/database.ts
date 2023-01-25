import { PrismaClient as SqliteClient } from "@prisma/shared_client/sqlite_client";
// import { PrismaClient as MongoDBClient } from "../../prisma/generated/mongodb-client";

export const sqliteClient = new SqliteClient();
