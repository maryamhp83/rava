"use client";

import { useState } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Circle, Truck } from "lucide-react";
import { DriversFilterableTableProps } from "@/type/component";
import { cn } from "cn";
import { Card, CardHeader, CardTitle } from "@/component/ui/card";
import { Input } from "@/component/ui/input";
import { Badge } from "@/component/ui/badge";
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
import EditDriverDialog from "@/component/dialog/driver/editDriverDialog";
import DeleteDriverDialog from "@/component/dialog/driver/deleteDriverDialog";

export default function DriversFilterableTable({
  data,
  className,
}: DriversFilterableTableProps) {
  const [searchStr, setSearchStr] = useState("");
  const normalizedSearch = searchStr.trim().toLowerCase();

  const filteredData = data.filter((item) => {
    return (
      !normalizedSearch ||
      item.fullName.toLowerCase().includes(normalizedSearch) ||
      item.nationalCode.includes(normalizedSearch) ||
      item.phoneNumber.includes(normalizedSearch) ||
      item.licensePlate.toLowerCase().includes(normalizedSearch) ||
      item.car.toLowerCase().includes(normalizedSearch)
    );
  });

  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>رانندگان</CardTitle>
        </CardHeader>

        <Empty className="px-5.5 py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Truck />
            </EmptyMedia>
            <EmptyTitle>هنوز راننده‌ای ثبت نشده است</EmptyTitle>
            <EmptyDescription>
              رانندگان جدید پس از ثبت، در این بخش نمایش داده می‌شوند.
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
            رانندگان
          </CardTitle>

          <Input
            placeholder="جست‌وجو بین رانندگان..."
            className="lg:w-62 w-full"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
          />
        </CardHeader>

        {filteredData.length === 0 ? (
          <Empty className="px-5.5 py-10">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Truck />
              </EmptyMedia>
              <EmptyTitle>راننده‌ای یافت نشد</EmptyTitle>
              <EmptyDescription>
                راننده موردنظر با اطلاعات واردشده پیدا نشد. عبارت جست‌وجو را
                تغییر دهید.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-background border-t border-input">
                <TableCell>نام راننده</TableCell>
                <TableCell>شماره تماس</TableCell>
                <TableCell>کد ملی</TableCell>
                <TableCell>خودرو</TableCell>
                <TableCell>شماره پلاک</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell>تاریخ ثبت</TableCell>
                <TableCell className="text-left">عملیات</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <FullNameBadge fullName={item.fullName} />
                  </TableCell>

                  <TableCell dir="ltr" className="text-right">
                    {digitsEnToFa(item.phoneNumber)}
                  </TableCell>

                  <TableCell>{digitsEnToFa(item.nationalCode)}</TableCell>

                  <TableCell>{item.car}</TableCell>

                  <TableCell>{digitsEnToFa(item.licensePlate)}</TableCell>

                  <TableCell>
                    <Badge
                      className={cn(
                        "bg-current/10",
                        item.status === "active"
                          ? "text-green-500"
                          : "text-red-500",
                      )}
                    >
                      <Circle className="fill-current ml-1" />
                      {item.status === "active" ? "فعال" : "غیرفعال"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {persianDateFormatter.format(new Date(item.createdAt))}
                  </TableCell>

                  <TableCell className="flex items-center justify-end gap-2">
                    <EditDriverDialog data={item} />
                    <DeleteDriverDialog data={item} />
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
