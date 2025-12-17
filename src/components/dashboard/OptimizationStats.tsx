import { TrendingUp, Clock, Route, Leaf, DollarSign, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Routes Optimized",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: Route,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Time Saved",
    value: "342h",
    change: "+8.5%",
    changeType: "positive",
    icon: Clock,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Cost Reduction",
    value: "$45.2K",
    change: "+15%",
    changeType: "positive",
    icon: DollarSign,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "CO₂ Reduced",
    value: "2.8 tons",
    change: "+22%",
    changeType: "positive",
    icon: Leaf,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function OptimizationStats() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Optimization Impact
            </h3>
            <p className="text-sm text-muted-foreground">
              This month's performance
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 divide-x divide-y divide-border">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-4 transition-colors hover:bg-muted/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    stat.bgColor
                  )}
                >
                  <Icon className={cn("h-4 w-4", stat.color)} />
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 text-accent" />
                  <span className="text-xs font-medium text-accent">
                    {stat.change}
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
