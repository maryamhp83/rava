import { Account, Client, TablesDB, ID } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client().setEndpoint(endpoint).setProject(project);

if (!endpoint || !project) {
  throw new Error("Missing Appwrite environment variables");
}

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

export { ID };
export { client };
