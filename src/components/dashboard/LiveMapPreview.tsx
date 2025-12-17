import {
  MapPin,
  Navigation,
  Truck,
  AlertTriangle,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockVehicles = [
  {
    id: 1,
    name: "TRK-001",
    status: "active",
    lat: 41.0082,
    lng: 28.9784,
    driver: "Ali Yilmaz",
  },
  {
    id: 2,
    name: "TRK-002",
    status: "active",
    lat: 41.0152,
    lng: 28.9651,
    driver: "Mehmet Demir",
  },
  {
    id: 3,
    name: "TRK-003",
    status: "idle",
    lat: 41.0222,
    lng: 28.9951,
    driver: "Ahmet Kaya",
  },
  {
    id: 4,
    name: "TRK-004",
    status: "delayed",
    lat: 40.9982,
    lng: 28.9584,
    driver: "Emre Ozturk",
  },
];

export function LiveMapPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Live Fleet Map</h3>
            <p className="text-sm text-muted-foreground">
              Real-time vehicle tracking
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            12 Active
          </Badge>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-[400px] bg-muted/30">
        {/* Simulated Map Grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20" />

        {/* Map Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Simulated Routes */}
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient
              id="routeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="hsl(199, 89%, 48%)"
                stopOpacity="0.2"
              />
              <stop
                offset="50%"
                stopColor="hsl(199, 89%, 48%)"
                stopOpacity="0.6"
              />
              <stop
                offset="100%"
                stopColor="hsl(152, 69%, 45%)"
                stopOpacity="0.8"
              />
            </linearGradient>
          </defs>
          <path
            d="M 80 300 Q 200 250, 300 280 T 500 200 T 700 250"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            strokeDasharray="8 4"
            className="animate-[dash_20s_linear_infinite]"
          />
          <path
            d="M 100 350 Q 250 300, 400 320 T 600 280"
            fill="none"
            stroke="hsl(152, 69%, 45%)"
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeDasharray="5 5"
          />
        </svg>

        {/* Vehicle Markers */}
        {mockVehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{
              left: `${15 + index * 20}%`,
              top: `${30 + (index % 2) * 25}%`,
            }}
          >
            <div
              className={`
              relative flex h-10 w-10 items-center justify-center rounded-full
              transition-all duration-300 group-hover:scale-125
              ${
                vehicle.status === "active"
                  ? "bg-accent/20 border-2 border-accent"
                  : ""
              }
              ${
                vehicle.status === "idle"
                  ? "bg-muted border-2 border-muted-foreground/50"
                  : ""
              }
              ${
                vehicle.status === "delayed"
                  ? "bg-warning/20 border-2 border-warning"
                  : ""
              }
            `}
            >
              {vehicle.status === "delayed" ? (
                <AlertTriangle className="h-5 w-5 text-warning" />
              ) : (
                <Truck
                  className={`h-5 w-5 ${
                    vehicle.status === "active"
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              )}
              {vehicle.status === "active" && (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent animate-ping" />
              )}
            </div>

            {/* Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                <p className="text-sm font-medium text-foreground">
                  {vehicle.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {vehicle.driver}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Depot Marker */}
        <div className="absolute left-[10%] top-[60%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <Navigation className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground whitespace-nowrap">
            Main Depot
          </span>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-4 divide-x divide-border border-t border-border">
        {[
          { label: "Active", value: "12", color: "text-accent" },
          { label: "Idle", value: "3", color: "text-muted-foreground" },
          { label: "Delayed", value: "2", color: "text-warning" },
          { label: "Offline", value: "1", color: "text-destructive" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
