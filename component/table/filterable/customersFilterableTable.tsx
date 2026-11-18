"use client";

import { useState } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Users } from "lucide-react";
import { CustomersFilterableTableProps } from "@/type/component";
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
import FullNameBadge from "@/component/fullNameBadge";
import { persianDateFormatter } from "@/lib/date";

export default function CustomersFilterableTable({
  data,
  className,
}: CustomersFilterableTableProps) {
  const [searchStr, setSearchStr] = useState("");
  const normalizedSearch = searchStr.trim().toLowerCase();

  const filteredData = data.filter((item) => {
    return (
      !normalizedSearch ||
      item.fullName.toLowerCase().includes(normalizedSearch) ||
      item.nationalCode.includes(normalizedSearch) ||
      item.phoneNumber.includes(normalizedSearch)
    );
  });

  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>مشتریان</CardTitle>
        </CardHeader>

        <Empty className="px-5.5 py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle>هنوز مشتری‌ای ثبت نشده است</EmptyTitle>
            <EmptyDescription>
              مشتریان جدید پس از ثبت، در این بخش نمایش داده می‌شوند.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  } else {
    return (
      <Card className={cn("pb-0", className)}>
        <CardHeader className="flex lg:flex-row flex-col items-center justify-between gap-3">
          <CardTitle className="truncate block lg:w-auto w-full">
            مشتریان
          </CardTitle>

          <Input
            placeholder="جست‌وجو بین مشتریان..."
            className="lg:w-62 w-full"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
          />
        </CardHeader>

        {filteredData.length === 0 ? (
          <Empty className="px-5.5 py-10">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Users />
              </EmptyMedia>
              <EmptyTitle>مشتری‌ای یافت نشد</EmptyTitle>
              <EmptyDescription>
                مشتری موردنظر با اطلاعات واردشده پیدا نشد. عبارت جست‌وجو را
                تغییر دهید.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-background border-t border-input">
                <TableCell>نام مشتری</TableCell>
                <TableCell>شماره تماس</TableCell>
                <TableCell>کد ملی</TableCell>
                <TableCell>آدرس</TableCell>
                <TableCell>تاریخ عضویت</TableCell>
                <TableCell className="text-left">عملیات</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={`customer-${index}`}>
                  <TableCell>
                    <FullNameBadge fullName={item.fullName} />
                  </TableCell>
                  <TableCell>{digitsEnToFa(item.phoneNumber)}</TableCell>
                  <TableCell>{digitsEnToFa(item.nationalCode)}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    {persianDateFormatter.format(new Date(item.createdAt))}
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    IDK
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    );
  }
}
