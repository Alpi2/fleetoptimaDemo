import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AreaChartComponentProps {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  gradient?: boolean;
  className?: string;
}

export function AreaChartComponent({
  data,
  dataKey,
  xAxisKey = "name",
  color = "hsl(var(--fleet-blue))",
  gradient = true,
  className = "",
}: AreaChartComponentProps) {
  const gradientId = `gradient-${dataKey}`;

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          {gradient && (
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
          )}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            opacity={0.3}
          />
          <XAxis
            dataKey={xAxisKey}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fillOpacity={1}
            fill={gradient ? `url(#${gradientId})` : color}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
