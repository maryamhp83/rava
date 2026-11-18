import { getCustomers } from "./customers";
import { getDrivers } from "./drivers";
import { getExpenses } from "./expenses";
import { getTrips } from "./trips";

export default async function getDashboardInfo() {
  const [customersFetch, driversFetch, tripsFetch, expensesFetch] =
    await Promise.all([
      getCustomers(),
      getDrivers(),
      getTrips(),
      getExpenses(),
    ]);

  const totalCustomers = customersFetch.total;
  const totalDrivers = driversFetch.total;
  const totalTrips = tripsFetch.total;

  const totalIncome = tripsFetch.rows.reduce(
    (total, item) => total + item.price,
    0,
  );

  const totalExpenses = expensesFetch.rows.reduce(
    (total, item) => total + item.price,
    0,
  );

  const totalProfit = totalIncome - totalExpenses;

  const doneTripsCount = tripsFetch.rows.filter(
    (item) => item.status === "done",
  ).length;

  const pendingTripsCount = tripsFetch.rows.filter(
    (item) => item.status === "pending",
  ).length;

  const cancledTripsCount = tripsFetch.rows.filter(
    (item) => item.status === "cancled",
  ).length;

  const latestTrips = tripsFetch.rows.slice(0, 5);

  // Persian months
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const monthlyData = new Map(
    persianMonths.map((month) => [
      month,
      {
        month,
        sales: 0,
        expenses: 0,
      },
    ]),
  );

  tripsFetch.rows.forEach((trip) => {
    if (trip.status !== "done") return;

    const date = new Date(trip.$createdAt);

    const month = new Intl.DateTimeFormat("fa-IR", {
      month: "long",
    }).format(date);

    const data = monthlyData.get(month);

    if (data) {
      data.sales += trip.price;
    }
  });

  expensesFetch.rows.forEach((expense) => {
    const date = new Date(expense.$createdAt);

    const month = new Intl.DateTimeFormat("fa-IR", {
      month: "long",
    }).format(date);

    const data = monthlyData.get(month);

    if (data) {
      data.expenses += expense.price;
    }
  });

  const saleExpensesData = Array.from(monthlyData.values());

  return {
    totalCustomers,
    totalDrivers,
    totalTrips,
    totalIncome,
    totalExpenses,
    totalProfit,
    doneTripsCount,
    pendingTripsCount,
    cancledTripsCount,
    latestTrips,
    saleExpensesData,
  };
}
