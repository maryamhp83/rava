"use client";

import { useState } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Circle, List } from "lucide-react";

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

import { EditTripDialog } from "@/component/dialog/trip/editTripDialog";
import { DeleteTripDialog } from "@/component/dialog/trip/deleteTripDialog";

import type { TripsFilterableTableProps } from "@/type/component";
import { Select } from "@/component/ui/select";

export function TripsFilterableTable({
  data,
  refetch,
  className,
}: TripsFilterableTableProps) {
  const [searchStr, setSearchStr] = useState("");

  const normalizedSearch = searchStr.trim().toLowerCase();

  const filteredData = data.filter((trip) => {
    return (
      trip.fullName.toLowerCase().includes(normalizedSearch) ||
      trip.driverFullName.toLowerCase().includes(normalizedSearch) ||
      trip.route.toLowerCase().includes(normalizedSearch) ||
      trip.status.toLowerCase().includes(normalizedSearch)
    );
  });

  const statusConfig = {
    done: {
      label: "تکمیل‌شده",
      className: "text-green-500",
    },
    pending: {
      label: "در انتظار",
      className: "text-amber-500",
    },
    cancled: {
      label: "لغوشده",
      className: "text-red-500",
    },
  } as const;

  if (data.length === 0) {
    return (
      <Card className={cn("pb-0", className)}>
        <CardHeader>
          <CardTitle>سفرها</CardTitle>
        </CardHeader>

        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>
            <EmptyTitle>هنوز سفری ثبت نشده است</EmptyTitle>
            <EmptyDescription>
              برای شروع، اولین سفر را ثبت کنید.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  } else {
    return (
      <Card className={cn("pb-0", className)}>
        <CardHeader className="flex lg:flex-row flex-col items-center justify-between gap-3">
          <CardTitle>لیست سفرها</CardTitle>

          <div className="flex lg:flex-row flex-col w-full lg:w-auto gap-3">
            <Select></Select>
            <Input
              value={searchStr}
              onChange={(event) => setSearchStr(event.target.value)}
              placeholder="جستجو در سفرها..."
              className="lg:w-62 w-full"
            />
          </div>
        </CardHeader>

        {filteredData.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <List />
              </EmptyMedia>
              <EmptyTitle>سفری یافت نشد</EmptyTitle>
              <EmptyDescription>
                عبارت جستجوی دیگری را امتحان کنید.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-background border-t border-input">
                <TableCell className="font-medium">مسافر</TableCell>
                <TableCell className="font-medium">راننده</TableCell>
                <TableCell className="font-medium">مسیر</TableCell>
                <TableCell className="font-medium">مبلغ</TableCell>
                <TableCell className="font-medium">وضعیت</TableCell>
                <TableCell className="font-medium">تاریخ ثبت</TableCell>
                <TableCell className="font-medium">عملیات</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>
                    <FullNameBadge fullName={trip.fullName} />
                  </TableCell>

                  <TableCell>
                    <FullNameBadge fullName={trip.driverFullName} />
                  </TableCell>

                  <TableCell className="max-w-56 truncate">
                    {trip.route}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {digitsEnToFa(trip.price.toLocaleString("en-US"))} تومان
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={cn(
                        "bg-current/10",
                        statusConfig[trip.status].className,
                      )}
                    >
                      <Circle className="fill-current ml-1" />
                      {statusConfig[trip.status].label}
                    </Badge>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {persianDateFormatter.format(new Date(trip.createdAt))}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <EditTripDialog data={trip} refetch={refetch} />
                      <DeleteTripDialog data={trip} refetch={refetch} />
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
}
