"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { SalesDataType } from "@/types";

type Props = {
  salesData: SalesDataType;
};

export const Charts = ({ salesData }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="totalSales"
          fill="#123456"
          radius={[4, 4, 0, 0]}
          className="fill-amber-200"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
