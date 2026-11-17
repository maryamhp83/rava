"use client";

import { TripsStatusCardProps } from "@/type/component";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  EChartsRadialChart,
  type ChartConfig,
} from "@/component/evilcharts/charts/echarts-radial-chart";

const chartConfig = {
  done: {
    label: "انجام شده",
    colors: {
      light: ["#10b981"],
      dark: ["#34d399"],
    },
  },
  cancelled: {
    label: "لغو شده",
    colors: {
      light: ["#ef4444"],
      dark: ["#f87171"],
    },
  },
  inProgress: {
    label: "در حال انجام",
    colors: {
      light: ["#3b82f6"],
      dark: ["#60a5fa"],
    },
  },
} satisfies ChartConfig;

export default function TripsStatusCard({
  data: { cancled, done, inProgress },
  className,
}: TripsStatusCardProps) {
  const total = done + cancled + inProgress;

  const statuses = [
    { status: "done", count: done },
    { status: "cancelled", count: cancled },
    { status: "inProgress", count: inProgress },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>وضعیت سفرها</CardTitle>
        <CardDescription>در ماه جاری</CardDescription>
      </CardHeader>
      <div>
        <EChartsRadialChart
          data={statuses}
          nameKey="status"
          config={chartConfig}
          max={Math.max(total, 1)}
          variant="full"
          innerRadius="30%"
          outerRadius="95%"
          className="size-75 mx-auto"
        >
          <EChartsRadialChart.RadialBar
            dataKey="count"
            barSize={16}
            cornerRadius={8}
            showBackground
          />
          <EChartsRadialChart.Tooltip />
          <EChartsRadialChart.Legend
            variant="circle"
            align="center"
            verticalAlign="bottom"
          />
        </EChartsRadialChart>
      </div>
    </Card>
  );
}
