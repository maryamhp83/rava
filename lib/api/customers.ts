import { GETCustomers } from "@/type/api";
import { addNewCustomerFormType } from "../formSchema";
import { tablesDB, databaseId, customersTableID, ID } from "./client";

export function getCustomers() {
  return tablesDB.listRows<GETCustomers>({
    databaseId,
    tableId: customersTableID,
  });
}

export function createCustomer(data: addNewCustomerFormType) {
  return tablesDB.createRow({
    databaseId,
    tableId: customersTableID,
    rowId: ID.unique(),
    data,
  });
}

export function editCustomer(id: string, data: addNewCustomerFormType) {
  return tablesDB.updateRow({
    databaseId,
    tableId: customersTableID,
    rowId: id,
    data,
  });
}

export function deleteCustomer(id: string) {
  return tablesDB.deleteRow({
    databaseId,
    tableId: customersTableID,
    rowId: id,
  });
}
