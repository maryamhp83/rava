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

export const tripsTableID = process.env.NEXT_PUBLIC_APPWRITE_TRIPS_TABLE_ID!;
export const customersTableID =
  process.env.NEXT_PUBLIC_APPWRITE_CUSTOMERS_TABLE_ID!;

export const driversTableID =
  process.env.NEXT_PUBLIC_APPWRITE_DRIVERS_TABLE_ID!;

export const expensesTableID =
  process.env.NEXT_PUBLIC_APPWRITE_EXPENSES_TABLE_ID!;

export { ID };
export { client };
