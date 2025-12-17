import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
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
  Search,
  Filter,
  Plus,
  Clock,
  MapPin,
  Truck,
  Zap,
  Play,
  Pause,
  MoreHorizontal,
  Route,
  ArrowRight,
  TrendingDown,
  Fuel,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Veri Seti ---
const routesData = [
  {
    id: "RT-001",
    name: "Istanbul North Circuit",
    status: "active",
    vehicle: "TRK-001",
    driver: "Ali Yilmaz",
    stops: 8,
    completed: 5,
    distance: "45.2 km",
    eta: "14:30",
    efficiency: 94,
  },
  {
    id: "RT-002",
    name: "Kadikoy Distribution",
    status: "active",
    vehicle: "TRK-002",
    driver: "Mehmet Demir",
    stops: 12,
    completed: 3,
    distance: "32.8 km",
    eta: "16:45",
    efficiency: 87,
  },
  {
    id: "RT-003",
    name: "Besiktas Express",
    status: "pending",
    vehicle: "TRK-005",
    driver: "Can Ozkan",
    stops: 6,
    completed: 0,
    distance: "28.5 km",
    eta: "Scheduled 15:00",
    efficiency: null,
  },
  {
    id: "RT-004",
    name: "Uskudar Loop",
    status: "completed",
    vehicle: "TRK-003",
    driver: "Ahmet Kaya",
    stops: 10,
    completed: 10,
    distance: "52.1 km",
    eta: "Completed",
    efficiency: 96,
  },
  {
    id: "RT-005",
    name: "Harbor Route",
    driver: "David Wilson",
    vehicle: "TRK-2156",
    stops: 10,
    completed: 5,
    distance: "52.3 km",
    eta: "15:20",
    status: "delayed",
    efficiency: 78,
  },
];

// --- Yardımcı Fonksiyonlar ---
const getStatusBadge = (status: string) => {
  const styles = {
    active: "bg-blue-500/10 text-blue-600 border-blue-200",
    completed: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    pending: "bg-slate-100 text-slate-600 border-slate-200",
    delayed: "bg-red-500/10 text-red-600 border-red-200",
  };

  const labels = {
    active: "In Progress",
    completed: "Completed",
    pending: "Pending",
    delayed: "Delayed",
  };

  return (
    <Badge variant="outline" className={styles[status as keyof typeof styles]}>
      {labels[status as keyof typeof labels] || status}
    </Badge>
  );
};

export default function RoutesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Arama Mantığı
  const filteredRoutes = routesData.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // İstatistikler
  const stats = {
    active: routesData.filter((r) => r.status === "active").length,
    distance: "1,247 km", // Örnek toplam
    efficiency: "89%",
    co2: "2.4t",
  };

  return (
    <DashboardLayout
      title="Route Optimization"
      subtitle="Manage and optimize delivery routes"
    >
      {/* 1. Aksiyon Barı (EN ÜSTTE) */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search routes..."
              className="pl-9 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Zap className="h-4 w-4" /> Optimize All
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Route
          </Button>
        </div>
      </div>

      {/* 2. İstatistik Kartları (ORTADA) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Routes</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Route className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Distance</p>
              <p className="text-2xl font-bold">{stats.distance}</p>
            </div>
            <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Efficiency</p>
              <p className="text-2xl font-bold">{stats.efficiency}</p>
            </div>
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Fuel className="h-5 w-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              <p className="text-2xl font-bold">{stats.co2}</p>
            </div>
            <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Rota Tablosu (EN ALTTA) */}
      <Card className="border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Route</TableHead>
              <TableHead>Vehicle / Driver</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoutes.map((route) => {
              const progress = (route.completed / route.stops) * 100;
              return (
                <TableRow key={route.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {route.name}
                      </p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {route.id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        {route.driver.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{route.driver}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Truck className="h-3 w-3" /> {route.vehicle}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-32 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {route.completed}/{route.stops} stops
                        </span>
                        <span className="font-medium">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{route.distance}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {route.eta}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(route.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {route.status === "active" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      {route.status === "pending" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
}
