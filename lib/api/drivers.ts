import { GETDrivers } from "@/type/api";
import { addNewDriverFormType } from "../formSchema";
import { tablesDB, databaseId, driversTableID, ID } from "./client";

export function getDrivers() {
  return tablesDB.listRows<GETDrivers>({
    databaseId,
    tableId: driversTableID,
  });
}

export function createDriver(data: addNewDriverFormType) {
  return tablesDB.createRow({
    databaseId,
    tableId: driversTableID,
    rowId: ID.unique(),
    data,
  });
}

export function editDriver(id: string, data: addNewDriverFormType) {
  return tablesDB.updateRow({
    databaseId,
    tableId: driversTableID,
    rowId: id,
    data,
  });
}

export function deleteDriver(id: string) {
  return tablesDB.deleteRow({
    databaseId,
    tableId: driversTableID,
    rowId: id,
  });
}
