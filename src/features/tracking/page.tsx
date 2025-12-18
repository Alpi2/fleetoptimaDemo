import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapContainer } from "@/components/map/MapContainer";
import {
  calculateTotalDistance,
  estimateDuration,
  formatDistance,
  formatDuration,
} from "@/lib/route-utils";
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
  Route,
  Timer,
} from "lucide-react";

const vehicles = [
  {
    id: "VH-001",
    plate: "LDN 123A",
    driver: "James Wilson",
    status: "moving" as const,
    speed: 65,
    location: "London, Westminster - A3211",
    lat: 51.5014,
    lng: -0.1246,
    fuel: 78,
    temperature: 4,
    lastUpdate: "2 min ago",
    route: "R-2024-001",
    eta: "14:30",
  },
  {
    id: "VH-002",
    plate: "MAN 456B",
    driver: "Emma Thompson",
    status: "stopped" as const,
    speed: 0,
    location: "London, City of London - Delivery Point",
    lat: 51.5155,
    lng: -0.0922,
    fuel: 45,
    temperature: 3,
    lastUpdate: "1 min ago",
    route: "R-2024-002",
    eta: "15:15",
  },
  {
    id: "VH-003",
    plate: "BIR 789C",
    driver: "Oliver Brown",
    status: "idle" as const,
    speed: 0,
    location: "London, Shoreditch - Depot",
    lat: 51.5246,
    lng: -0.0782,
    fuel: 92,
    temperature: 5,
    lastUpdate: "5 min ago",
    route: "-",
    eta: "-",
  },
  {
    id: "VH-004",
    plate: "LIV 012D",
    driver: "Sophia Davis",
    status: "moving" as const,
    speed: 48,
    location: "London, Croydon - A23",
    lat: 51.3714,
    lng: -0.0977,
    fuel: 34,
    temperature: 4,
    lastUpdate: "1 min ago",
    route: "R-2024-003",
    eta: "16:45",
  },
];

const mapVehicles = vehicles.map((v) => ({
  id: v.id,
  lat: v.lat,
  lng: v.lng,
  status:
    v.status === "moving"
      ? ("active" as const)
      : v.status === "stopped"
      ? ("idle" as const)
      : ("offline" as const),
  plate: v.plate,
}));

const demoRoutes = [
  {
    id: "R-2024-001",
    name: "Westminster - City of London Route",
    color: "#3b82f6",
    points: [
      { lat: 51.5014, lng: -0.1246 },
      { lat: 51.505, lng: -0.115 },
      { lat: 51.51, lng: -0.105 },
      { lat: 51.512, lng: -0.098 },
      { lat: 51.5155, lng: -0.0922 },
    ],
  },
  {
    id: "R-2024-003",
    name: "Croydon - Shoreditch Route",
    color: "#8b5cf6",
    points: [
      { lat: 51.3714, lng: -0.0977 },
      { lat: 51.4, lng: -0.09 },
      { lat: 51.45, lng: -0.08 },
      { lat: 51.5, lng: -0.085 },
      { lat: 51.5246, lng: -0.0782 },
    ],
  },
];

const routesWithInfo = demoRoutes.map((route) => {
  const distance = calculateTotalDistance(route.points);
  const duration = estimateDuration(distance);
  return {
    ...route,
    distance,
    duration,
    formattedDistance: formatDistance(distance),
    formattedDuration: formatDuration(duration),
  };
});

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
      return "Moving";
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
      subtitle="Real-time locations of vehicles and drivers"
    >
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-end">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <MapContainer
                  className="h-full w-full"
                  center={[-0.1276, 51.5074]}
                  zoom={10}
                  vehicles={mapVehicles}
                  showVehicles={true}
                  routes={demoRoutes}
                  showRoutes={true}
                />
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  Active Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {routesWithInfo.map((route) => (
                    <div
                      key={route.id}
                      className="p-3 rounded-lg border border-border bg-card/50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: route.color }}
                        />
                        <span className="font-medium text-sm">
                          {route.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Navigation className="h-3.5 w-3.5" />
                          <span>{route.formattedDistance}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Timer className="h-3.5 w-3.5" />
                          <span>{route.formattedDuration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{route.points.length} points</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

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
                              <span>{vehicle.speed} km/h</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Fuel className="h-3.5 w-3.5 text-warning" />
                              <span>{vehicle.fuel}%</span>
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
