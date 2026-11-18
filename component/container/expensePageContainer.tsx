"use client";

import { TitleOnlyProps } from "@/type/component";
import PageInfoCard from "@/component/card/pageInfoCard";
import { AddNewExpenseDialog } from "../dialog/expense/addNewExpenseDialog";
import { ExpensesFilterableTable } from "../table/filterable/expenseFilterableTable";
import { Expense } from "@/type/general";

export const fakeExpenses: Expense[] = [
  {
    id: "1",
    createdAt: "2026-11-17T08:30:00.000Z",
    name: "اجاره دفتر",
    price: 15000000,
    description: "اجاره ماهانه دفتر مرکزی",
  },
  {
    id: "2",
    createdAt: "2026-11-16T10:15:00.000Z",
    name: "قبض برق",
    price: 1850000,
    description: "قبض برق دفتر برای ماه جاری",
  },
  {
    id: "3",
    createdAt: "2026-11-15T12:00:00.000Z",
    name: "قبض آب",
    price: 420000,
    description: "قبض آب دو ماهه دفتر",
  },
  {
    id: "4",
    createdAt: "2026-11-15T09:45:00.000Z",
    name: "قبض گاز",
    price: 760000,
    description: "قبض گاز دفتر مرکزی",
  },
  {
    id: "5",
    createdAt: "2026-11-14T14:20:00.000Z",
    name: "اینترنت",
    price: 990000,
    description: "اشتراک ماهانه اینترنت پرسرعت",
  },
  {
    id: "6",
    createdAt: "2026-11-13T11:10:00.000Z",
    name: "سوخت خودروها",
    price: 3200000,
    description: "شارژ کارت سوخت ناوگان",
  },
  {
    id: "7",
    createdAt: "2026-11-12T16:40:00.000Z",
    name: "تعمیر خودرو",
    price: 5400000,
    description: "تعویض لنت ترمز و روغن موتور",
  },
];

export default function ExpensePageContainer({ title }: TitleOnlyProps) {
  return (
    <>
      <PageInfoCard
        title={title}
        subTitle="ثبت و دسته‌بندی هزینه‌های آژانس"
        className="mb-8"
        cta={<AddNewExpenseDialog />}
      />
      <ExpensesFilterableTable data={fakeExpenses} />
    </>
  );
}
