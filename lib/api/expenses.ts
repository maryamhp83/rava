import { GETExpenses } from "@/type/api";
import { addNewExpenseFormType } from "../formSchema";
import { tablesDB, databaseId, expensesTableID, ID } from "./client";

type addExpenseType = Omit<addNewExpenseFormType, "price"> & {
  price: number;
};

export function getExpenses() {
  return tablesDB.listRows<GETExpenses>({
    databaseId,
    tableId: expensesTableID,
  });
}

export function createExpense(data: addExpenseType) {
  return tablesDB.createRow({
    databaseId,
    tableId: expensesTableID,
    rowId: ID.unique(),
    data,
  });
}

export function editExpense(id: string, data: addExpenseType) {
  return tablesDB.updateRow({
    databaseId,
    tableId: expensesTableID,
    rowId: id,
    data,
  });
}

export function deleteExpense(id: string) {
  return tablesDB.deleteRow({
    databaseId,
    tableId: expensesTableID,
    rowId: id,
  });
}
