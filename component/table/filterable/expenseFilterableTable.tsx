"use client";

import { useState } from "react";
import { List } from "lucide-react";
import { cn } from "cn";
import { Card, CardHeader, CardTitle } from "@/component/ui/card";
import { Input } from "@/component/ui/input";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/component/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/component/ui/table";

import { persianDateFormatter } from "@/lib/date";
import { EditExpenseDialog } from "@/component/dialog/expense/editExpenseDialog";
import { DeleteExpenseDialog } from "@/component/dialog/expense/deleteExpenseDialog";
import type { ExpensesFilterableTableProps } from "@/type/component";
import { formatPersianNumber } from "@/lib/number";

export function ExpensesFilterableTable({
  className,
  data,
  refetch,
}: ExpensesFilterableTableProps) {
  const [searchStr, setSearchStr] = useState("");

  const normalizedSearch = searchStr.trim().toLowerCase();

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch) ||
      String(item.price).includes(normalizedSearch)
    );
  });

  return (
    <Card className={cn("pb-0", className)}>
      <CardHeader className="flex lg:flex-row flex-col items-center justify-between gap-3">
        <CardTitle>لیست هزینه‌ها</CardTitle>

        <div className="flex lg:flex-row flex-col w-full lg:w-auto gap-3">
          <Input
            value={searchStr}
            onChange={(event) => setSearchStr(event.target.value)}
            placeholder="جستجو..."
            className="lg:w-62 w-full"
          />
        </div>
      </CardHeader>

      {data.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>

            <EmptyTitle>هنوز هزینه‌ای ثبت نشده است</EmptyTitle>

            <EmptyDescription>
              برای شروع، اولین هزینه را ثبت کنید.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : filteredData.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>

            <EmptyTitle>موردی یافت نشد</EmptyTitle>

            <EmptyDescription>
              عبارت جستجوی دیگری را امتحان کنید.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-background border-t border-input">
              <TableCell>عنوان هزینه</TableCell>
              <TableCell>مبلغ</TableCell>
              <TableCell>توضیحات</TableCell>
              <TableCell>تاریخ ثبت</TableCell>
              <TableCell className="text-end">عملیات</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>

                <TableCell>{formatPersianNumber(item.price)} تومان</TableCell>
                <TableCell className="max-w-64 truncate">
                  {item.description}
                </TableCell>

                <TableCell>
                  {persianDateFormatter.format(new Date(item.createdAt))}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 justify-end">
                    <EditExpenseDialog data={item} refetch={refetch} />
                    <DeleteExpenseDialog data={item} refetch={refetch} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
