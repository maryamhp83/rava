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
import ApiLoader from "../api/apiLoader";
import { useQuery } from "@tanstack/react-query";
import getDashboardInfo from "@/lib/api/dashboard";

export default function DashboardPageContainer() {
  const { data, ...query } = useQuery({
    queryFn: getDashboardInfo,
    queryKey: ["dashboard"],
  });

  const stats: Array<Omit<StatusCardProps, "className">> = [
    {
      title: "کل مشتریان",
      amount: data?.totalCustomers ?? 0,
      unit: "people",
      icon: {
        element: <Users size={18} />,
        color: "text-lime-600",
      },
    },
    {
      title: "پرسنل فعال",
      amount: data?.totalDrivers ?? 0,
      icon: {
        element: <UserRound size={18} />,
        color: "text-sky-600",
      },
    },
    {
      title: "کل سفارشات",
      amount: data?.totalTrips ?? 0,
      icon: {
        element: <GitBranch size={18} />,
        color: "text-purple-600",
      },
    },
    {
      title: "درآمد کل",
      amount: data?.totalIncome ?? 0,
      unit: "toman",
      icon: {
        element: <CircleDollarSign size={18} />,
        color: "text-lime-600",
      },
    },
    {
      title: "هزینه کل",
      amount: data?.totalExpenses ?? 0,
      unit: "toman",
      icon: {
        element: <Wallet size={18} />,
        color: "text-orange-600",
      },
    },
    {
      title: "سود خالص",
      amount: data?.totalProfit ?? 0,
      unit: "toman",
      icon: {
        element: <ChartNoAxesColumn size={18} />,
        color: "text-lime-600",
      },
    },
  ];

  return (
    <ApiLoader
      isLoading={query.isLoading}
      isError={query.isError}
      refetch={query.refetch}
    >
      {data && (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 sm:grid-cols-3 mb-4">
            {stats.map((item, index) => (
              <StatusCard {...item} key={`home-page-stats-${index}`} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 sm:grid-cols-3 mb-4">
            <SaleExpensesCard
              className="lg:col-span-3 sm:col-span-2"
              data={data.saleExpensesData}
            />
            <TripsStatusCard
              className="lg:col-span-2"
              data={{
                cancled: data.cancledTripsCount,
                inProgress: data.pendingTripsCount,
                done: data.doneTripsCount,
              }}
            />
          </div>
          <LatestTripsTableCard data={data.latestTrips} />
        </>
      )}
    </ApiLoader>
  );
}
