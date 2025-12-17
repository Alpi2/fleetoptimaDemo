import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Truck,
  Package,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "delivery",
    message: "Order ORD-2024-003 delivered successfully",
    time: "2 min ago",
    icon: CheckCircle,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: 2,
    type: "alert",
    message: "TRK-004 running low on fuel (23%)",
    time: "15 min ago",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    id: 3,
    type: "route",
    message: "Route optimization completed: 18% improvement",
    time: "32 min ago",
    icon: Truck,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 4,
    type: "order",
    message: "New order received from ABC Logistics",
    time: "1 hour ago",
    icon: Package,
    color: "text-foreground",
    bgColor: "bg-muted",
  },
  {
    id: 5,
    type: "schedule",
    message: "TRK-003 scheduled for maintenance",
    time: "2 hours ago",
    icon: Clock,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
];

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <Bell className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Activity Feed</h3>
            <p className="text-sm text-muted-foreground">
              Recent system events
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-muted-foreground"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-border">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/30"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg shrink-0",
                  activity.bgColor
                )}
              >
                <Icon className={cn("h-4 w-4", activity.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
