import type { Metadata } from "next";
import MainLayout from "@/component/mainLayout";
import ExpensePageContainer from "@/component/container/expensePageContainer";

const title = "مدیریت هزینه‌ها";

export const metadata: Metadata = { title };

export default function ExpensePage() {
  return (
    <MainLayout>
      <ExpensePageContainer title={title} />
    </MainLayout>
  );
}
