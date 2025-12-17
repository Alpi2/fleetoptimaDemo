import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Truck,
  Search,
  Filter,
  Plus,
  Fuel,
  Gauge,
  Wrench,
  MapPin,
  MoreHorizontal,
  LayoutGrid,
  List,
  Power,
  PowerOff,
  ThermometerSun,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. Birleştirilmiş Veri Yapısı ---
const vehiclesData = [
  {
    id: "TRK-001",
    type: "Heavy Truck",
    model: "Mercedes Actros 2545",
    plate: "34 ABC 001",
    driver: "Ali Yilmaz",
    status: "active",
    location: "Istanbul, Kadikoy",
    fuel: 78,
    mileage: "145,230 km",
    nextService: "Feb 15, 2025",
    capacity: "24 tons",
    temperature: 4, // Soğutmalı araçlar için
  },
  {
    id: "TRK-002",
    type: "Delivery Van",
    model: "Ford Transit 350",
    plate: "34 DEF 002",
    driver: "Mehmet Demir",
    status: "active",
    location: "Istanbul, Besiktas",
    fuel: 45,
    mileage: "82,100 km",
    nextService: "Mar 20, 2025",
    capacity: "3.5 tons",
    temperature: null,
  },
  {
    id: "TRK-003",
    type: "Heavy Truck",
    model: "Volvo FH16",
    plate: "34 GHI 003",
    driver: "Ahmet Kaya",
    status: "maintenance",
    location: "Main Depot",
    fuel: 92,
    mileage: "198,500 km",
    nextService: "Today",
    capacity: "28 tons",
    temperature: -18,
  },
  {
    id: "TRK-004",
    type: "Light Truck",
    model: "Iveco Daily",
    plate: "34 JKL 004",
    driver: "Emre Ozturk",
    status: "idle",
    location: "Istanbul, Uskudar",
    fuel: 23,
    mileage: "68,900 km",
    nextService: "Feb 25, 2025",
    capacity: "7 tons",
    temperature: null,
  },
  {
    id: "TRK-005",
    type: "Refrigerated Truck",
    model: "Scania R450",
    plate: "34 MNO 005",
    driver: "Unassigned",
    status: "idle",
    location: "Main Depot",
    fuel: 88,
    mileage: "112,400 km",
    nextService: "Mar 01, 2025",
    capacity: "18 tons",
    temperature: -22,
  },
];

// --- Yardımcı Fonksiyonlar ---
const getStatusConfig = (status: string) => {
  const configs = {
    active: {
      label: "Active",
      color: "text-emerald-600 bg-emerald-100 border-emerald-200", // Tailwind colors
      icon: Power,
      dot: "bg-emerald-500",
    },
    maintenance: {
      label: "Maintenance",
      color: "text-amber-600 bg-amber-100 border-amber-200",
      icon: Wrench,
      dot: "bg-amber-500",
    },
    idle: {
      label: "Idle",
      color: "text-slate-600 bg-slate-100 border-slate-200",
      icon: PowerOff,
      dot: "bg-slate-500",
    },
  };
  return configs[status as keyof typeof configs] || configs.idle;
};

const getFuelColor = (fuel: number) => {
  if (fuel >= 60) return "text-emerald-600";
  if (fuel >= 30) return "text-amber-600";
  return "text-rose-600";
};

export default function FleetPage() {
  // Hibrid Yapı State'i: 'grid' (Kart) veya 'list' (Tablo)
  const [view, setView] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState("");

  // Arama Filtreleme Mantığı
  const filteredVehicles = vehiclesData.filter(
    (vehicle) =>
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // İstatistik Hesaplama
  const stats = {
    total: vehiclesData.length,
    active: vehiclesData.filter((v) => v.status === "active").length,
    maintenance: vehiclesData.filter((v) => v.status === "maintenance").length,
    idle: vehiclesData.filter((v) => v.status === "idle").length,
  };

  return (
    <DashboardLayout
      title="Fleet Management"
      subtitle="Monitor and manage your vehicle fleet operations"
    >
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* --- 1. İstatistik Kartları (Her iki görünümde de sabit) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Fleet",
              value: stats.total,
              icon: Truck,
              color: "text-blue-600",
              bg: "bg-blue-100",
            },
            {
              label: "Active Vehicles",
              value: stats.active,
              icon: Power,
              color: "text-emerald-600",
              bg: "bg-emerald-100",
            },
            {
              label: "In Maintenance",
              value: stats.maintenance,
              icon: Wrench,
              color: "text-amber-600",
              bg: "bg-amber-100",
            },
            {
              label: "Idle Vehicles",
              value: stats.idle,
              icon: PowerOff,
              color: "text-slate-600",
              bg: "bg-slate-100",
            },
          ].map((stat, idx) => (
            <Card key={idx} className="border-border/50 shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div
                  className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    stat.bg
                  )}
                >
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- 2. Kontrol Barı (Arama & Görünüm Değiştirici) --- */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <div className="flex w-full sm:w-auto gap-3 items-center">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, Driver, Plate..."
                className="pl-9 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {/* View Toggle Buttons */}
            <div className="flex items-center bg-muted p-1 rounded-lg border border-border">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>

            <Button className="gap-2 ml-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Vehicle</span>
            </Button>
          </div>
        </div>

        {/* --- 3. Görünüm Alanı (Hibrid Mantık) --- */}
        {view === "grid" ? (
          /* === GRID GÖRÜNÜMÜ (KARTLAR) === */
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredVehicles.map((vehicle) => {
              const status = getStatusConfig(vehicle.status);
              return (
                <Card
                  key={vehicle.id}
                  className="group hover:shadow-md transition-all duration-300 border-border/50"
                >
                  <div className="p-5 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Truck className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-foreground">
                              {vehicle.id}
                            </h3>
                            <span
                              className={cn("h-2 w-2 rounded-full", status.dot)}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {vehicle.type}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Track Live</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-muted-foreground">Model:</div>
                      <div className="font-medium text-right">
                        {vehicle.model}
                      </div>
                      <div className="text-muted-foreground">Driver:</div>
                      <div className="font-medium text-right">
                        {vehicle.driver}
                      </div>
                      <div className="text-muted-foreground">Plate:</div>
                      <div className="font-medium text-right">
                        {vehicle.plate}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="pt-4 border-t border-border space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Fuel
                            className={cn(
                              "h-4 w-4",
                              getFuelColor(vehicle.fuel)
                            )}
                          />
                          <span>Fuel</span>
                        </div>
                        <span className="font-bold">{vehicle.fuel}%</span>
                      </div>
                      <Progress value={vehicle.fuel} className="h-1.5" />

                      <div className="flex justify-between text-sm pt-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[120px]">
                            {vehicle.location}
                          </span>
                        </div>
                        {vehicle.temperature !== null && (
                          <div className="flex items-center gap-1 text-blue-500 font-medium">
                            <ThermometerSun className="h-3 w-3" />
                            {vehicle.temperature}°C
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status Footer */}
                    <div className="pt-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "w-full justify-center py-1",
                          status.color
                        )}
                      >
                        <status.icon className="h-3 w-3 mr-1.5" />
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* === LIST GÖRÜNÜMÜ (TABLO) === */
          <Card className="border-border/50 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Vehicle Info</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Fuel & Mileage</TableHead>
                  <TableHead>Next Service</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => {
                  const status = getStatusConfig(vehicle.status);
                  return (
                    <TableRow key={vehicle.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Truck className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{vehicle.id}</p>
                            <p className="text-xs text-muted-foreground">
                              {vehicle.plate}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {vehicle.driver.charAt(0)}
                          </div>
                          <span className="text-sm">{vehicle.driver}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={status.color}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {vehicle.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 w-24">
                          <div className="flex justify-between text-xs">
                            <span className={getFuelColor(vehicle.fuel)}>
                              {vehicle.fuel}%
                            </span>
                            <span className="text-muted-foreground">
                              <Gauge className="h-3 w-3 inline mr-0.5" />
                              {vehicle.mileage.split(" ")[0]}k
                            </span>
                          </div>
                          <Progress value={vehicle.fuel} className="h-1.5" />
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {vehicle.nextService}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <MapPin className="h-4 w-4 mr-2" /> Track
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Wrench className="h-4 w-4 mr-2" /> Maintenance
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
