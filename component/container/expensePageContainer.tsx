"use client";

import { TitleOnlyProps } from "@/type/component";
import PageInfoCard from "@/component/card/pageInfoCard";
import { AddNewExpenseDialog } from "../dialog/expense/addNewExpenseDialog";
import { ExpensesFilterableTable } from "../table/filterable/expenseFilterableTable";
import ApiLoader from "../api/apiLoader";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/lib/api/expenses";

export default function ExpensePageContainer({ title }: TitleOnlyProps) {
  const query = useQuery({
    queryFn: getExpenses,
    queryKey: ["expenses"],
  });

  const expenses = query.data?.rows ?? [];

  return (
    <ApiLoader
      isLoading={query.isLoading}
      isError={query.isError}
      refetch={query.refetch}
    >
      <PageInfoCard
        title={title}
        subTitle="ثبت و دسته‌بندی هزینه‌های آژانس"
        className="mb-8"
        cta={<AddNewExpenseDialog refetch={query.refetch} />}
      />
      <ExpensesFilterableTable
        refetch={query.refetch}
        data={expenses.map((item) => ({
          ...item,
          id: item.$id,
          createdAt: item.$createdAt,
        }))}
      />
    </ApiLoader>
  );
}
