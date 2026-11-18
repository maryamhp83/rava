import { Models } from "appwrite";
import { Customer, Driver, Expense, Trip } from "./general";

export type GETCustomers = Models.Row & Omit<Customer, "id" | "createdAt">;
export type GETDrivers = Models.Row & Omit<Driver, "id" | "createdAt">;
export type GETTrips = Models.Row & Omit<Trip, "id" | "createdAt">;
export type GETExpenses = Models.Row & Omit<Expense, "id" | "createdAt">;
