"use client";

import {
  Users,
  UserRound,
  GitBranch,
  Wallet,
  CircleDollarSign,
  ChartNoAxesColumn,
} from "lucide-react";
import StatusCard from "../card/statusCard";
import { StatusCardProps } from "@/type/component";
import SaleExpensesCard from "../card/saleProfitCard";
import TripsStatusCard from "../card/tripsStatusCard";
import LatestTripsTableCard from "../table/latestTripsTableCard";

const stats: Array<Omit<StatusCardProps, "className">> = [
  {
    title: "کل مشتریان",
    amount: 1842,
    unit: "people",
    icon: {
      element: <Users size={18} />,
      color: "text-lime-600",
    },
  },
  {
    title: "پرسنل فعال",
    amount: 28,
    icon: {
      element: <UserRound size={18} />,
      color: "text-sky-600",
    },
  },
  {
    title: "کل سفارشات",
    amount: 1248,
    icon: {
      element: <GitBranch size={18} />,
      color: "text-purple-600",
    },
  },
  {
    title: "درآمد کل",
    amount: 186.4,
    unit: "toman",
    icon: {
      element: <CircleDollarSign size={18} />,
      color: "text-lime-600",
    },
  },
  {
    title: "هزینه کل",
    amount: 74.2,
    unit: "toman",
    icon: {
      element: <Wallet size={18} />,
      color: "text-orange-600",
    },
  },
  {
    title: "سود خالص",
    amount: 112.2,
    unit: "toman",
    icon: {
      element: <ChartNoAxesColumn size={18} />,
      color: "text-lime-600",
    },
  },
];

export default function DashboardPageContainer() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 sm:grid-cols-3 mb-4">
        {stats.map((item, index) => (
          <StatusCard {...item} key={`home-page-stats-${index}`} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 sm:grid-cols-3 mb-4">
        <SaleExpensesCard
          className="lg:col-span-3 sm:col-span-2"
          data={[
            { expenses: 1250000, month: "فروردین", sales: 3200000 },
            { expenses: 1800000, month: "اردیبهشت", sales: 4500000 },
            { expenses: 1500000, month: "خرداد", sales: 3800000 },
            { expenses: 2200000, month: "تیر", sales: 5100000 },
            { expenses: 1900000, month: "مرداد", sales: 4700000 },
            { expenses: 2600000, month: "شهریور", sales: 6200000 },
            { expenses: 2100000, month: "مهر", sales: 5500000 },
            { expenses: 2900000, month: "آبان", sales: 7100000 },
            { expenses: 2400000, month: "آذر", sales: 6300000 },
            { expenses: 3200000, month: "دی", sales: 8200000 },
            { expenses: 2800000, month: "بهمن", sales: 7600000 },
            { expenses: 3500000, month: "اسفند", sales: 9500000 },
          ]}
        />
        <TripsStatusCard
          className="lg:col-span-2"
          data={{
            cancled: 24,
            inProgress: 45,
            done: 125,
          }}
        />
      </div>
      <LatestTripsTableCard
        data={[
          {
            fullName: "علی رضایی",
            driverFullName: "محمد احمدی",
            price: 250000,
            status: "done",
          },
          {
            fullName: "سارا محمدی",
            driverFullName: "حسین کریمی",
            price: 180000,
            status: "pending",
          },
          {
            fullName: "امیرحسین حسینی",
            driverFullName: "رضا مرادی",
            price: 320000,
            status: "done",
          },
          {
            fullName: "نگار کاظمی",
            driverFullName: "مهدی صادقی",
            price: 150000,
            status: "cancled",
          },
          {
            fullName: "محمد مهدوی",
            driverFullName: "علی اکبری",
            price: 420000,
            status: "done",
          },
        ]}
      />
    </>
  );
}
