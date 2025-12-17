import {
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-2024-001",
    customer: "ABC Logistics",
    destination: "Istanbul, Kadikoy",
    status: "in_transit",
    eta: "14:30",
    items: 12,
    priority: "high",
  },
  {
    id: "ORD-2024-002",
    customer: "XYZ Corp",
    destination: "Istanbul, Besiktas",
    status: "pending",
    eta: "15:45",
    items: 8,
    priority: "normal",
  },
  {
    id: "ORD-2024-003",
    customer: "Tech Solutions",
    destination: "Istanbul, Sisli",
    status: "delivered",
    eta: "Completed",
    items: 5,
    priority: "normal",
  },
  {
    id: "ORD-2024-004",
    customer: "Global Trade",
    destination: "Istanbul, Uskudar",
    status: "delayed",
    eta: "16:15",
    items: 20,
    priority: "urgent",
  },
  {
    id: "ORD-2024-005",
    customer: "Prime Shipping",
    destination: "Istanbul, Maltepe",
    status: "in_transit",
    eta: "17:00",
    items: 15,
    priority: "high",
  },
];

const statusConfig = {
  in_transit: {
    label: "In Transit",
    icon: Clock,
    color: "text-primary bg-primary/10",
  },
  pending: {
    label: "Pending",
    icon: Package,
    color: "text-warning bg-warning/10",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-accent bg-accent/10",
  },
  delayed: {
    label: "Delayed",
    icon: AlertCircle,
    color: "text-destructive bg-destructive/10",
  },
};

const priorityConfig = {
  normal: { label: "Normal", color: "bg-muted text-muted-foreground" },
  high: { label: "High", color: "bg-primary/20 text-primary" },
  urgent: { label: "Urgent", color: "bg-destructive/20 text-destructive" },
};

export function RecentOrders() {
  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
            <Package className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Recent Orders</h3>
            <p className="text-sm text-muted-foreground">
              Latest delivery assignments
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

      {/* Orders List */}
      <div className="divide-y divide-border">
        {orders.map((order, index) => {
          const status =
            statusConfig[order.status as keyof typeof statusConfig];
          const priority =
            priorityConfig[order.priority as keyof typeof priorityConfig];
          const StatusIcon = status.icon;

          return (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    status.color
                  )}
                >
                  <StatusIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{order.id}</p>
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] h-5", priority.color)}
                    >
                      {priority.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.customer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-foreground">
                    {order.destination}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.items} items
                  </p>
                </div>
                <div className="text-right min-w-[80px]">
                  <Badge
                    variant="secondary"
                    className={cn("font-medium", status.color)}
                  >
                    {status.label}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    ETA: {order.eta}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
