"use client";

import { LatestTripsTableCardProps } from "@/type/component";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft, Circle, List } from "lucide-react";
import { cn } from "cn";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getInitials } from "@/lib/util";
import { formatPersianNumber } from "@/lib/number";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import FullNameBadge from "../fullNameBadge";

export default function LatestTripsTableCard({
  className,
  data,
}: LatestTripsTableCardProps) {
  return (
    <Card className={cn("p-0 gap-0", className)}>
      <CardHeader className={"p-6"}>
        <CardTitle>آخرین سفرها</CardTitle>
        <div className="flex items-center justify-between flex-wrap">
          <CardDescription>سفرهای ثبت‌شده امروز</CardDescription>
          <Button
            variant={"link"}
            render={
              <Link href="/trips">
                مشاهده همه <ChevronLeft />{" "}
              </Link>
            }
          />
        </div>
      </CardHeader>
      {data.length === 0 ? (
        <Empty className="p-6">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <List />
            </EmptyMedia>
            <EmptyTitle>هنوز سفری ثبت نشده است.</EmptyTitle>
            <EmptyDescription>
              پس از ثبت سفر های جدید، اطلاعات آن‌ها در این بخش نمایش داده
              می‌شود.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Table className="border-t border-input">
          <TableHeader className="bg-input/5 border-b border-input">
            <TableRow>
              <TableCell>مشتری</TableCell>
              <TableCell>راننده</TableCell>
              <TableCell>مبلغ</TableCell>
              <TableCell>وضعیت</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <FullNameBadge fullName={item.fullName} />
                </TableCell>
                <TableCell>
                  <FullNameBadge fullName={item.driverFullName} />
                </TableCell>
                <TableCell>{formatPersianNumber(item.price)} تومان</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "bg-current/5",
                      item.status === "done"
                        ? "text-green-500"
                        : item.status === "cancled"
                          ? "text-red-500"
                          : "text-amber-500",
                    )}
                  >
                    <Circle className="fill-current ml-1" />
                    {item.status === "done"
                      ? "انجام شده"
                      : item.status === "cancled"
                        ? "لغو شده"
                        : "در انتظار"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
