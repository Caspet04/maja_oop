import { PrismaClient as SqliteClient } from "../../prisma/generated/sqlite-client";
// import { PrismaClient as MongoDBClient } from "../../prisma/generated/mongodb-client";

export const sqliteClient = new SqliteClient();