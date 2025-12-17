import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  MapPin,
  Navigation,
  Truck,
  Clock,
  Fuel,
  Thermometer,
  Signal,
  RefreshCw,
} from "lucide-react";

const vehicles = [
  {
    id: "VH-001",
    plate: "B AR 123",
    driver: "Jonh Hall",
    status: "moving",
    speed: 65,
    location: "A12 Autobahn, Berlin - Frankfurt",
    fuel: 78,
    temperature: 4,
    lastUpdate: "2 min vor",
    route: "R-2024-001",
    eta: "14:30",
  },
  {
    id: "VH-002",
    plate: "H Y 123",
    driver: "Maria Schmidt",
    status: "stopped",
    speed: 0,
    location: "München, A9 - Raststätte",
    fuel: 45,
    temperature: 3,
    lastUpdate: "1 min vor",
    route: "R-2024-002",
    eta: "15:15",
  },
  {
    id: "VH-003",
    plate: "BB C 1234",
    driver: "Anton Weber",
    status: "idle",
    speed: 0,
    location: "Bochum, A40 ",
    fuel: 92,
    temperature: 5,
    lastUpdate: "5 min vor",
    route: "-",
    eta: "-",
  },
  {
    id: "VH-004",
    plate: "BB D 5678",
    driver: "Helga Fischer",
    status: "moving",
    speed: 48,
    location: "Hamburg, B75 - Innenstadt",
    fuel: 34,
    temperature: 4,
    lastUpdate: "1 min vor",
    route: "R-2024-003",
    eta: "16:45",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "moving":
      return "bg-accent/20 text-accent border-accent/30";
    case "stopped":
      return "bg-warning/20 text-warning border-warning/30";
    case "idle":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "moving":
      return "In motion";
    case "stopped":
      return "Stopped";
    case "idle":
      return "Idle";
    default:
      return status;
  }
};

export default function TrackingPage() {
  return (
    <DashboardLayout
      title="Live Tracking"
      subtitle="Vehicles and drivers' real-time locations"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-end">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-primary" />
                    Map View
                  </CardTitle>
                  <Badge variant="outline" className="gap-1">
                    <Signal className="h-3 w-3 text-accent" />
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="h-[520px]">
                <div className="relative h-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-border">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9nPjwvc3ZnPg==')]" />
                  </div>

                  {/* Vehicle Markers */}
                  {vehicles.map((vehicle, index) => (
                    <div
                      key={vehicle.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${20 + index * 20}%`,
                        top: `${30 + index * 15}%`,
                      }}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          vehicle.status === "moving"
                            ? "bg-accent"
                            : vehicle.status === "stopped"
                            ? "bg-warning"
                            : "bg-muted-foreground"
                        } shadow-lg transition-transform group-hover:scale-125`}
                      >
                        <Truck className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-background/90 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {vehicle.plate}
                      </div>
                    </div>
                  ))}

                  {/* Map Controls */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <span className="text-lg font-bold">+</span>
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <span className="text-lg font-bold">−</span>
                    </Button>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 space-y-2">
                    <p className="text-xs font-medium text-foreground">Durum</p>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-muted-foreground">In motion</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-warning" />
                      <span className="text-muted-foreground">Stopped</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                      <span className="text-muted-foreground">Idle</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vehicle List */}
          <div>
            <Card className="h-[600px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Vehicle List</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search vehicle..."
                    className="pl-10 h-9"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[480px] pr-4">
                  <div className="space-y-3">
                    {vehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="p-3 rounded-lg border border-border bg-card hover:border-primary/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-foreground">
                              {vehicle.plate}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {vehicle.driver}
                            </p>
                          </div>
                          <Badge className={getStatusColor(vehicle.status)}>
                            {getStatusText(vehicle.status)}
                          </Badge>
                        </div>

                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate">{vehicle.location}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1.5">
                              <Navigation className="h-3.5 w-3.5 text-primary" />
                              <span>{vehicle.speed} km/s</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Fuel className="h-3.5 w-3.5 text-warning" />
                              <span>%{vehicle.fuel}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Thermometer className="h-3.5 w-3.5 text-accent" />
                              <span>{vehicle.temperature}°C</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{vehicle.lastUpdate}</span>
                            </div>
                          </div>
                        </div>

                        {vehicle.route !== "-" && (
                          <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Route: {vehicle.route}
                            </span>
                            <span className="text-primary">
                              ETA: {vehicle.eta}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
