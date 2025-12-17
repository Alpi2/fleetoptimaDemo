import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartComponentProps {
  data: PieChartData[];
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
  className?: string;
}

export function PieChartComponent({
  data,
  innerRadius = 60,
  outerRadius = 100,
  showLabels = true,
  className = "",
}: PieChartComponentProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            label={
              showLabels ? ({ name, value }) => `${name}: ${value}%` : undefined
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
