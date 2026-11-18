"use client";

import { TitleOnlyProps } from "@/type/component";
import PageInfoCard from "@/component/card/pageInfoCard";
import { TripsFilterableTable } from "../table/filterable/tripsFilterableTable";
import { Trip } from "@/type/general";
import { AddNewTripDialog } from "../dialog/trip/addNewTripDialog";

export const fakeTrips: Trip[] = [
  {
    id: "1",
    createdAt: "2026-11-01T08:30:00.000Z",
    fullName: "محمد رضایی",
    driverFullName: "علی محمدی",
    price: 450000,
    status: "done",
    route: "تهران، میدان آزادی ← تهران، میدان ونک",
  },
  {
    id: "2",
    createdAt: "2026-11-02T10:15:00.000Z",
    fullName: "فاطمه احمدی",
    driverFullName: "حسین کریمی",
    price: 680000,
    status: "pending",
    route: "تهران، تجریش ← کرج، عظیمیه",
  },
  {
    id: "3",
    createdAt: "2026-11-03T12:45:00.000Z",
    fullName: "امیرحسین حسینی",
    driverFullName: "رضا احمدی",
    price: 320000,
    status: "done",
    route: "تهران، تهرانپارس ← تهران، نارمک",
  },
  {
    id: "4",
    createdAt: "2026-11-04T09:20:00.000Z",
    fullName: "زهرا محمدی",
    driverFullName: "مهدی جعفری",
    price: 1200000,
    status: "cancled",
    route: "تهران ← قم",
  },
  {
    id: "5",
    createdAt: "2026-11-05T14:00:00.000Z",
    fullName: "سعید موسوی",
    driverFullName: "فرهاد نادری",
    price: 550000,
    status: "done",
    route: "تهران، سعادت‌آباد ← تهران، فرودگاه مهرآباد",
  },
  {
    id: "6",
    createdAt: "2026-11-06T16:30:00.000Z",
    fullName: "مریم کریمی",
    driverFullName: "پیمان اکبری",
    price: 850000,
    status: "pending",
    route: "تهران ← اصفهان",
  },
  {
    id: "7",
    createdAt: "2026-11-07T11:10:00.000Z",
    fullName: "حسن نادری",
    driverFullName: "احمد مرادی",
    price: 390000,
    status: "done",
    route: "تهران، شهرری ← تهران، میدان انقلاب",
  },
  {
    id: "8",
    createdAt: "2026-11-08T07:45:00.000Z",
    fullName: "نگار رضایی",
    driverFullName: "علی محمدی",
    price: 950000,
    status: "pending",
    route: "کرج ← تهران، فرودگاه امام خمینی",
  },
  {
    id: "9",
    createdAt: "2026-11-09T13:25:00.000Z",
    fullName: "رضا اکبری",
    driverFullName: "حسین کریمی",
    price: 1500000,
    status: "cancled",
    route: "تهران ← شمال، چالوس",
  },
  {
    id: "10",
    createdAt: "2026-11-10T18:00:00.000Z",
    fullName: "علی مرادی",
    driverFullName: "رضا احمدی",
    price: 720000,
    status: "done",
    route: "تهران، ونک ← تهران، فرودگاه امام خمینی",
  },
];

export default function TripsPageContainer({ title }: TitleOnlyProps) {
  return (
    <>
      <PageInfoCard
        title={title}
        subTitle="ثبت و پیگیری سفرهای آژانس"
        className="mb-8"
        cta={<AddNewTripDialog />}
      />
      <TripsFilterableTable data={fakeTrips} />
    </>
  );
}
