import { useEffect, useRef } from "react";

interface MapContainerProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
}

export function MapContainer({
  className = "",
  center = [41.0082, 28.9784],
  zoom = 12,
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Placeholder for Mapbox integration
  useEffect(() => {
    // Mapbox initialization will go here
    console.log("Map initialized at", center, "zoom:", zoom);
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`relative rounded-lg overflow-hidden ${className}`}
    >
      {/* Simulated map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Route lines */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 50 150 Q 150 100 250 180 T 450 120"
            stroke="hsl(var(--fleet-blue))"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8,4"
            className="animate-pulse"
          />
          <path
            d="M 80 250 Q 200 200 350 280 T 520 200"
            stroke="hsl(var(--fleet-green))"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8,4"
            className="animate-pulse"
          />
        </svg>

        {/* Vehicle markers */}
        {[
          { x: 120, y: 140, status: "active", id: "TRK-2847" },
          { x: 280, y: 200, status: "active", id: "TRK-1923" },
          { x: 400, y: 150, status: "idle", id: "TRK-3421" },
        ].map((vehicle, i) => (
          <div
            key={i}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: vehicle.x, top: vehicle.y }}
          >
            <div
              className={`relative h-8 w-8 rounded-full flex items-center justify-center ${
                vehicle.status === "active" ? "bg-fleet-green" : "bg-muted"
              }`}
            >
              <svg
                className="h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 4h-4.18C13.4 2.84 12.3 2 11 2H7c-1.3 0-2.4.84-2.82 2H0v14h2.09c.41 1.16 1.51 2 2.91 2s2.5-.84 2.91-2h6.18c.41 1.16 1.51 2 2.91 2s2.5-.84 2.91-2H22V8l-4-4zM5 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-4h-6V8h4.5l1.5 1.5V13z" />
              </svg>
              {vehicle.status === "active" && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-background animate-pulse" />
              )}
            </div>
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground whitespace-nowrap">
              {vehicle.id}
            </span>
          </div>
        ))}

        {/* Depot marker */}
        <div className="absolute left-[60px] top-[180px] transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-10 w-10 rounded-lg bg-fleet-purple flex items-center justify-center">
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L4 7v2h16V7L12 2zM4 11v9h16v-9H4zm8 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
          </div>
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-medium text-fleet-purple whitespace-nowrap">
            Depot A
          </span>
        </div>
      </div>

      {/* Map overlay info */}
      <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 text-xs">
        <p className="text-muted-foreground">Map integration placeholder</p>
        <p className="text-foreground font-medium">Mapbox GL JS ready</p>
      </div>
    </div>
  );
}
