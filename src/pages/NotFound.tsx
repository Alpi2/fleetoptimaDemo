import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Package,
  Search,
  Filter,
  Plus,
  Clock,
  MapPin,
  User,
  MoreHorizontal,
  ArrowUpDown,
  Calendar,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-2024-001",
    customer: "ABC Logistics Ltd.",
    contact: "+90 532 123 4567",
    pickup: "Kadikoy Warehouse",
    delivery: "Besiktas Distribution Center",
    status: "in_transit",
    priority: "high",
    items: 12,
    weight: "450 kg",
    created: "2024-02-01 09:30",
    eta: "Today 14:30",
    assignedTo: "TRK-001",
  },
  {
    id: "ORD-2024-002",
    customer: "XYZ Corporation",
    contact: "+90 533 234 5678",
    pickup: "Main Depot",
    delivery: "Sisli Office Park",
    status: "pending",
    priority: "normal",
    items: 8,
    weight: "120 kg",
    created: "2024-02-01 10:15",
    eta: "Today 15:45",
    assignedTo: null,
  },
  {
    id: "ORD-2024-003",
    customer: "Tech Solutions Inc.",
    contact: "+90 534 345 6789",
    pickup: "Uskudar Terminal",
    delivery: "Maltepe Tech Hub",
    status: "delivered",
    priority: "normal",
    items: 5,
    weight: "85 kg",
    created: "2024-02-01 08:00",
    eta: "Completed",
    assignedTo: "TRK-003",
  },
  {
    id: "ORD-2024-004",
    customer: "Global Trade Partners",
    contact: "+90 535 456 7890",
    pickup: "Tuzla Port",
    delivery: "Pendik Industrial Zone",
    status: "delayed",
    priority: "urgent",
    items: 20,
    weight: "1,200 kg",
    created: "2024-02-01 07:00",
    eta: "Today 16:15 (Delayed)",
    assignedTo: "TRK-004",
  },
  {
    id: "ORD-2024-005",
    customer: "Prime Shipping Co.",
    contact: "+90 536 567 8901",
    pickup: "Kartal Hub",
    delivery: "Atasehir Business Center",
    status: "pending",
    priority: "high",
    items: 15,
    weight: "380 kg",
    created: "2024-02-01 11:00",
    eta: "Today 17:00",
    assignedTo: "TRK-002",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-warning/10 text-warning border-warning/20",
  },
  in_transit: {
    label: "In Transit",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  delivered: {
    label: "Delivered",
    color: "bg-accent/10 text-accent border-accent/20",
  },
  delayed: {
    label: "Delayed",
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const priorityConfig = {
  normal: { label: "Normal", color: "bg-muted text-muted-foreground" },
  high: { label: "High", color: "bg-primary/20 text-primary" },
  urgent: { label: "Urgent", color: "bg-destructive/20 text-destructive" },
};

export default function OrdersPage() {
  return (
    <DashboardLayout
      title="Order Management"
      subtitle="Track and manage delivery orders"
    >
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-9 bg-muted/50"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-5 mb-6">
        {[
          { label: "Total Orders", value: "124", color: "text-foreground" },
          { label: "Pending", value: "24", color: "text-warning" },
          { label: "In Transit", value: "38", color: "text-primary" },
          { label: "Delivered", value: "58", color: "text-accent" },
          { label: "Delayed", value: "4", color: "text-destructive" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left">
                  <Checkbox />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Route
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  ETA
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => {
                const status =
                  statusConfig[order.status as keyof typeof statusConfig];
                const priority =
                  priorityConfig[order.priority as keyof typeof priorityConfig];

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">
                            {order.id}
                          </p>
                          <Badge
                            variant="outline"
                            className={cn("text-[10px] h-5", priority.color)}
                          >
                            {priority.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {order.created}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {order.customer}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.contact}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-accent" />
                          <span className="text-muted-foreground">
                            {order.pickup}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-foreground">
                            {order.delivery}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <p className="text-foreground">{order.items} items</p>
                        <p className="text-xs text-muted-foreground">
                          {order.weight}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span
                            className={cn(
                              order.status === "delayed"
                                ? "text-destructive"
                                : "text-foreground"
                            )}
                          >
                            {order.eta}
                          </span>
                        </div>
                        {order.assignedTo && (
                          <div className="flex items-center gap-2 mt-1">
                            <Truck className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {order.assignedTo}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        variant="outline"
                        className={cn("font-medium", status.color)}
                      >
                        {status.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing 1-5 of 124 orders
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
