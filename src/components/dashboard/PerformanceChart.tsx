import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Mon", deliveries: 45, optimized: 42 },
  { name: "Tue", deliveries: 52, optimized: 48 },
  { name: "Wed", deliveries: 48, optimized: 46 },
  { name: "Thu", deliveries: 61, optimized: 58 },
  { name: "Fri", deliveries: 55, optimized: 52 },
  { name: "Sat", deliveries: 38, optimized: 36 },
  { name: "Sun", deliveries: 28, optimized: 26 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function PerformanceChart() {
  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Weekly Performance
            </h3>
            <p className="text-sm text-muted-foreground">
              Delivery metrics overview
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Optimized</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-foreground">327</span>
            <span className="flex items-center text-xs font-medium text-accent">
              <ArrowUpRight className="h-3 w-3" />
              12%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Total Deliveries</p>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-foreground">308</span>
            <span className="flex items-center text-xs font-medium text-accent">
              <ArrowUpRight className="h-3 w-3" />
              8%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Optimized Routes</p>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-foreground">94%</span>
            <span className="flex items-center text-xs font-medium text-accent">
              <ArrowUpRight className="h-3 w-3" />
              3%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Efficiency Rate</p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="deliveriesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="hsl(199, 89%, 48%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(199, 89%, 48%)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id="optimizedGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="hsl(152, 69%, 45%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(152, 69%, 45%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(222, 47%, 16%)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="deliveries"
              name="Total"
              stroke="hsl(199, 89%, 48%)"
              strokeWidth={2}
              fill="url(#deliveriesGradient)"
            />
            <Area
              type="monotone"
              dataKey="optimized"
              name="Optimized"
              stroke="hsl(152, 69%, 45%)"
              strokeWidth={2}
              fill="url(#optimizedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
