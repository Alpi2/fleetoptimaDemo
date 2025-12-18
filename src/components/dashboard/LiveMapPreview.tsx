import { MapPin, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapContainer } from "@/components/map/MapContainer";
import { useNavigate } from "react-router-dom";

const mockVehicles = [
  {
    id: "TRK-001",
    lat: 51.5074,
    lng: -0.1276,
    status: "active" as const,
    plate: "LDN 001A",
  },
  {
    id: "TRK-002",
    lat: 51.5155,
    lng: -0.0922,
    status: "active" as const,
    plate: "MAN 002B",
  },
  {
    id: "TRK-003",
    lat: 51.5014,
    lng: -0.1419,
    status: "idle" as const,
    plate: "BIR 003C",
  },
  {
    id: "TRK-004",
    lat: 51.5246,
    lng: -0.0782,
    status: "offline" as const,
    plate: "LIV 004D",
  },
];

export function LiveMapPreview() {
  const navigate = useNavigate();

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
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />4
            Active
          </Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/tracking")}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-[400px]">
        <MapContainer
          className="h-full w-full"
          center={[-0.1276, 51.5074]} // London center
          zoom={11}
          vehicles={mockVehicles}
          showVehicles={true}
        />
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-4 divide-x divide-border border-t border-border">
        {[
          { label: "Active", value: "2", color: "text-accent" },
          { label: "Idle", value: "1", color: "text-muted-foreground" },
          { label: "Stopped", value: "0", color: "text-warning" },
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
