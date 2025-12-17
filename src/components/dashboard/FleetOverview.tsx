import { useNavigate } from "react-router-dom"; // Import var, bu doğru.
import {
  Truck,
  User,
  Fuel,
  Wrench,
  ArrowRight,
  Battery,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const vehicles = [
  {
    id: "TRK-001",
    type: "Heavy Truck",
    driver: "Ali Yilmaz",
    status: "active",
    fuel: 78,
    mileage: "45,230 km",
    nextService: "In 2 days",
    load: 85,
  },
  {
    id: "TRK-002",
    type: "Delivery Van",
    driver: "Mehmet Demir",
    status: "active",
    fuel: 45,
    mileage: "32,100 km",
    nextService: "In 15 days",
    load: 60,
  },
  {
    id: "TRK-003",
    type: "Heavy Truck",
    driver: "Ahmet Kaya",
    status: "maintenance",
    fuel: 92,
    mileage: "78,500 km",
    nextService: "Today",
    load: 0,
  },
  {
    id: "TRK-004",
    type: "Light Truck",
    driver: "Emre Ozturk",
    status: "active",
    fuel: 23,
    mileage: "28,900 km",
    nextService: "In 8 days",
    load: 95,
  },
];

export function FleetOverview() {
  // DÜZELTME 1: useNavigate kancasını (hook) burada başlattık.
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Fleet Overview</h3>
            <p className="text-sm text-muted-foreground">
              Vehicle status & metrics
            </p>
          </div>
        </div>

        {/* DÜZELTME 2: Butona onClick özelliği ekledik */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-muted-foreground"
          onClick={() => navigate("/fleet")}
        >
          Manage Fleet
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Vehicle Cards */}
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className={cn(
              "group relative overflow-hidden rounded-lg border p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg",
              vehicle.status === "maintenance"
                ? "border-warning/30 bg-warning/5"
                : "border-border bg-muted/30"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Status Indicator */}
            <div className="absolute right-4 top-4">
              <span
                className={cn(
                  "inline-flex h-2 w-2 rounded-full",
                  vehicle.status === "active" && "bg-accent",
                  vehicle.status === "maintenance" && "bg-warning animate-pulse"
                )}
              />
            </div>

            {/* Vehicle Info */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <Truck className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{vehicle.id}</p>
                <p className="text-sm text-muted-foreground">{vehicle.type}</p>
              </div>
            </div>

            {/* Driver */}
            <div className="mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {vehicle.driver}
              </span>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              {/* Fuel */}
              <div className="flex items-center gap-3">
                <Fuel
                  className={cn(
                    "h-4 w-4",
                    vehicle.fuel < 30
                      ? "text-destructive"
                      : "text-muted-foreground"
                  )}
                />
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Fuel</span>
                    <span
                      className={cn(
                        "font-medium",
                        vehicle.fuel < 30
                          ? "text-destructive"
                          : "text-foreground"
                      )}
                    >
                      {vehicle.fuel}%
                    </span>
                  </div>
                  <Progress
                    value={vehicle.fuel}
                    className={cn(
                      "h-1.5",
                      vehicle.fuel < 30 && "[&>div]:bg-destructive"
                    )}
                  />
                </div>
              </div>

              {/* Load Capacity */}
              <div className="flex items-center gap-3">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Load</span>
                    <span
                      className={cn(
                        "font-medium",
                        vehicle.load > 90 ? "text-warning" : "text-foreground"
                      )}
                    >
                      {vehicle.load}%
                    </span>
                  </div>
                  <Progress
                    value={vehicle.load}
                    className={cn(
                      "h-1.5",
                      vehicle.load > 90 && "[&>div]:bg-warning"
                    )}
                  />
                </div>
              </div>

              {/* Service */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Wrench
                    className={cn(
                      "h-4 w-4",
                      vehicle.nextService === "Today"
                        ? "text-warning"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="text-muted-foreground">Next Service</span>
                </div>
                <span
                  className={cn(
                    "font-medium",
                    vehicle.nextService === "Today"
                      ? "text-warning"
                      : "text-foreground"
                  )}
                >
                  {vehicle.nextService}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
