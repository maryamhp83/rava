import { GETTrips } from "@/type/api";
import { addNewTripFormType } from "../formSchema";
import { tablesDB, databaseId, tripsTableID, ID } from "./client";

type addTripType = Omit<addNewTripFormType, "price"> & {
  price: number;
};

export function getTrips() {
  return tablesDB.listRows<GETTrips>({
    databaseId,
    tableId: tripsTableID,
  });
}

export function createTrip(data: addTripType) {
  return tablesDB.createRow({
    databaseId,
    tableId: tripsTableID,
    rowId: ID.unique(),
    data,
  });
}

export function editTrip(id: string, data: addTripType) {
  return tablesDB.updateRow({
    databaseId,
    tableId: tripsTableID,
    rowId: id,
    data,
  });
}

export function deleteTrip(id: string) {
  return tablesDB.deleteRow({
    databaseId,
    tableId: tripsTableID,
    rowId: id,
  });
}
