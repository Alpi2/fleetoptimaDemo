import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Plus,
  Clock,
  User,
  MoreHorizontal,
  ArrowUpDown,
  Calendar,
  Truck,
  Eye,
  Edit,
  Trash2,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- Veri Seti (DÜZELTİLDİ: assignedTo -> vehicle yapıldı) ---
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
    vehicle: "TRK-001", // DÜZELTİLDİ
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
    vehicle: null, // DÜZELTİLDİ
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
    vehicle: "TRK-003", // DÜZELTİLDİ
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
    vehicle: "TRK-004", // DÜZELTİLDİ
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
    vehicle: "TRK-002", // DÜZELTİLDİ
  },
];

// --- Konfigürasyonlar ---
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
  high: {
    label: "High",
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
  urgent: {
    label: "Urgent",
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.delivery.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // İstatistikler
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    transit: orders.filter((o) => o.status === "in_transit").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    delayed: orders.filter((o) => o.status === "delayed").length,
  };

  return (
    <DashboardLayout
      title="Order Management"
      subtitle="Track and manage delivery orders"
    >
      {/* 1. BÖLÜM: Arama ve Butonlar (ACTIONS) */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, Customer, Location..."
              className="pl-9 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <ArrowUpDown className="h-4 w-4" /> Sort
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Order
          </Button>
        </div>
      </div>

      {/* 2. BÖLÜM: İstatistik Kartları (STATS) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Total Orders */}
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Orders</p>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Pending</p>
          </CardContent>
        </Card>

        {/* In Transit */}
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.transit}</p>
            <p className="text-sm text-muted-foreground mt-1">In Transit</p>
          </CardContent>
        </Card>

        {/* Delivered */}
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {stats.delivered}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Delivered</p>
          </CardContent>
        </Card>

        {/* Delayed */}
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-bold text-red-600">{stats.delayed}</p>
            <p className="text-sm text-muted-foreground mt-1">Delayed</p>
          </CardContent>
        </Card>
      </div>

      {/* 3. BÖLÜM: Tablo (TABLE) */}
      <Card className="border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Order & Customer</TableHead>
              <TableHead>Route (Pickup → Delivery)</TableHead>
              <TableHead>Cargo Details</TableHead>
              <TableHead>Status & ETA</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => {
              const status =
                statusConfig[order.status as keyof typeof statusConfig];
              const priority =
                priorityConfig[order.priority as keyof typeof priorityConfig];

              return (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox />
                  </TableCell>

                  {/* Order & Customer */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">
                          {order.id}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] h-5", priority.color)}
                        >
                          {priority.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">
                          {order.customer}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {order.contact}
                      </div>
                    </div>
                  </TableCell>

                  {/* ROTA GÖRSELLEŞTİRMESİ */}
                  <TableCell>
                    <div className="relative pl-4 ml-1 border-l-2 border-dashed border-gray-300 dark:border-gray-600 py-1">
                      <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-white dark:ring-gray-950" />
                      <span className="absolute -left-[5px] bottom-0 h-2.5 w-2.5 rounded-full bg-emerald-600 ring-4 ring-white dark:ring-gray-950" />
                      <div className="flex flex-col gap-3">
                        <div className="leading-none">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
                            Pickup
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {order.pickup}
                          </span>
                        </div>
                        <div className="leading-none">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
                            Drop
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {order.delivery}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Cargo Details (DÜZELTİLDİ: order.vehicle kullanıldı) */}
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <Package className="h-3 w-3 text-muted-foreground" />
                        <span>{order.items} items</span>
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {order.weight}
                      </div>
                      {order.vehicle ? (
                        <div className="flex items-center gap-1.5 text-xs font-mono bg-muted px-1.5 py-0.5 rounded w-fit mt-1">
                          <Truck className="h-3 w-3" /> {order.vehicle}
                        </div>
                      ) : (
                        <span className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" /> Unassigned
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Status & ETA */}
                  <TableCell>
                    <div className="space-y-2">
                      <Badge
                        variant="outline"
                        className={cn("font-medium", status.color)}
                      >
                        {status.label}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Clock
                          className={cn(
                            "h-3.5 w-3.5",
                            order.status === "delayed"
                              ? "text-red-500"
                              : "text-muted-foreground"
                          )}
                        />
                        <span
                          className={cn(
                            "font-medium",
                            order.status === "delayed" ? "text-red-600" : ""
                          )}
                        >
                          {order.eta}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" /> Edit Order
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" /> Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* 4. BÖLÜM: PAGINATION */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Showing {filteredOrders.length > 0 ? 1 : 0}-
            {Math.min(5, filteredOrders.length)} of {filteredOrders.length}{" "}
            orders
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
      </Card>
    </DashboardLayout>
  );
}
