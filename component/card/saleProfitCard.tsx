"use client";

import { EvilAreaChart } from "@/component/evilcharts/charts/recharts-area-chart";
import type { ChartConfig } from "@/component/evilcharts/ui/recharts-chart";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SaleExpensesCardProps } from "@/type/component";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";

const chartConfig = {
  sales: {
    label: "فروش",
    colors: {
      light: ["#d7f36a"],
      dark: ["#d7f36a"],
    },
  },
  expenses: {
    label: "سود",
    colors: {
      light: ["#a3b2ae"],
      dark: ["#879791"],
    },
  },
} satisfies ChartConfig;

const periods = ["۳۰ روز اخیر", "۹۰ روز اخیر", "۱۸۰ روز اخیر", "۳۶۰ روز اخیر"];

export default function SaleExpensesCard({
  data,
  className,
}: SaleExpensesCardProps) {
  const [filter, setFilter] = useState<(typeof periods)[number] | null>(null);

  const filteredData = useMemo(() => {
    if (!filter) return data;

    let months: number;

    switch (filter) {
      case "۳۰ روز اخیر":
        months = 2;
        break;

      case "۹۰ روز اخیر":
        months = 3;
        break;

      case "۱۸۰ روز اخیر":
        months = 6;
        break;

      case "۳۶۰ روز اخیر":
        months = 12;
        break;

      default:
        return data;
    }

    return data.slice(-months);
  }, [data, filter]);

  return (
    <Card className={className}>
      <CardHeader className="flex items-center justify-between gap-4">
        <div className="flex-1 overflow-hidden">
          <CardTitle className="truncate mb-1">درآمد و هزینه</CardTitle>
          <CardDescription className="truncate">
            مقایسه عملکرد مالی
          </CardDescription>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger dir="rtl" className="w-36 shrink-0">
            <SelectValue placeholder="انتخاب بازه" />
          </SelectTrigger>
          <SelectContent dir="rtl" align="end">
            {periods.map((period, index) => (
              <SelectItem key={`period-selector-${index}`} value={period}>
                {period}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <div className="px-5.5">
        <EvilAreaChart
          data={filteredData}
          config={chartConfig}
          animationType="center-out"
          curveType="monotone"
          className="h-70 w-full"
        >
          <EvilAreaChart.Grid />
          <EvilAreaChart.XAxis dataKey="month" tickMargin={10} />
          <EvilAreaChart.Tooltip />
          <EvilAreaChart.Legend />
          <EvilAreaChart.Area
            dataKey="sales"
            variant="gradient"
            strokeVariant="dashed"
            strokeWidth={2}
          />
          <EvilAreaChart.Area
            dataKey="expenses"
            variant="gradient"
            strokeVariant="solid"
            strokeWidth={1.5}
          />
        </EvilAreaChart>
      </div>
    </Card>
  );
}
