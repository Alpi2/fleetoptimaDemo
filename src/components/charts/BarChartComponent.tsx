import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartComponentProps {
  data: Array<Record<string, unknown>>;
  dataKeys: string[];
  xAxisKey?: string;
  colors?: string[];
  className?: string;
}

export function BarChartComponent({
  data,
  dataKeys,
  xAxisKey = "name",
  colors = ["hsl(var(--fleet-blue))", "hsl(var(--fleet-green))"],
  className = "",
}: BarChartComponentProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
