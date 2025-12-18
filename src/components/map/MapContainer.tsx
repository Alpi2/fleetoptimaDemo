import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { fromLonLat } from "ol/proj";
import { Style, Circle, Fill, Stroke, Text } from "ol/style";
import Overlay from "ol/Overlay";
import "ol/ol.css";

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  status: "active" | "idle" | "offline";
  plate?: string;
}

interface RoutePoint {
  lat: number;
  lng: number;
}

interface Route {
  id: string;
  name?: string;
  color?: string;
  points: RoutePoint[];
}

interface MapContainerProps {
  className?: string;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  vehicles?: Vehicle[];
  showVehicles?: boolean;
  routes?: Route[];
  showRoutes?: boolean;
}

export function MapContainer({
  className = "",
  center = [-0.1276, 51.5074], // London default
  zoom = 10,
  vehicles = [],
  showVehicles = true,
  routes = [],
  showRoutes = true,
}: MapContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const vehicleSource = useRef<VectorSource>(new VectorSource());
  const routeSource = useRef<VectorSource>(new VectorSource());
  const popupRef = useRef<HTMLDivElement>(null);
  const popupOverlay = useRef<Overlay | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (popupRef.current) {
      popupOverlay.current = new Overlay({
        element: popupRef.current,
        positioning: "bottom-center",
        stopEvent: false,
        offset: [0, -15],
      });
    }

    map.current = new Map({
      target: mapContainer.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: routeSource.current,
          zIndex: 1,
        }),
        new VectorLayer({
          source: vehicleSource.current,
          zIndex: 2,
        }),
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom,
      }),
    });

    if (popupOverlay.current) {
      map.current.addOverlay(popupOverlay.current);
    }

    map.current.on("click", (evt) => {
      const feature = map.current?.forEachFeatureAtPixel(evt.pixel, (f) => f);
      if (feature && popupRef.current && popupOverlay.current) {
        const geom = feature.getGeometry();
        const props = feature.getProperties();

        if (geom instanceof Point && props.plate !== undefined) {
          // Vehicle popup
          const coordinates = geom.getCoordinates();
          popupRef.current.innerHTML = `
            <div class="bg-background border border-border rounded-lg shadow-lg p-3 text-sm">
              <p class="font-bold text-foreground">${
                props.plate || props.id
              }</p>
              <p class="text-muted-foreground capitalize">${props.status}</p>
            </div>
          `;
          popupOverlay.current.setPosition(coordinates);
        } else if (geom instanceof LineString && props.name) {
          // Route popup
          popupRef.current.innerHTML = `
            <div class="bg-background border border-border rounded-lg shadow-lg p-3 text-sm">
              <p class="font-bold text-foreground">${props.name}</p>
              <p class="text-muted-foreground">${props.pointCount} points</p>
            </div>
          `;
          popupOverlay.current.setPosition(evt.coordinate);
        }
      } else if (popupOverlay.current) {
        popupOverlay.current.setPosition(undefined);
      }
    });

    map.current.on("pointermove", (evt) => {
      const pixel = map.current?.getEventPixel(evt.originalEvent);
      const hit = pixel ? map.current?.hasFeatureAtPixel(pixel) : false;
      if (mapContainer.current) {
        mapContainer.current.style.cursor = hit ? "pointer" : "";
      }
    });

    return () => {
      map.current?.setTarget(undefined);
    };
  }, [center, zoom]);

  // Update routes
  useEffect(() => {
    routeSource.current.clear();
    if (!showRoutes) return;

    routes.forEach((route) => {
      const coordinates = route.points.map((p) => fromLonLat([p.lng, p.lat]));
      const lineFeature = new Feature({
        geometry: new LineString(coordinates),
        name: route.name,
        pointCount: route.points.length,
      });
      lineFeature.setStyle(
        new Style({
          stroke: new Stroke({
            color: route.color || "#3b82f6",
            width: 5,
            lineDash: [10, 10],
          }),
        })
      );
      routeSource.current.addFeature(lineFeature);

      // Start (A) and End (B) markers
      if (route.points.length >= 2) {
        const start = new Feature({
          geometry: new Point(
            fromLonLat([route.points[0].lng, route.points[0].lat])
          ),
        });
        start.setStyle(
          new Style({
            image: new Circle({
              radius: 9,
              fill: new Fill({ color: "#22c55e" }),
              stroke: new Stroke({ color: "#ffffff", width: 3 }),
            }),
            text: new Text({
              text: "A",
              font: "bold 12px sans-serif",
              fill: new Fill({ color: "#ffffff" }),
              offsetY: -1,
            }),
          })
        );

        const end = new Feature({
          geometry: new Point(
            fromLonLat([
              route.points[route.points.length - 1].lng,
              route.points[route.points.length - 1].lat,
            ])
          ),
        });
        end.setStyle(
          new Style({
            image: new Circle({
              radius: 9,
              fill: new Fill({ color: "#ef4444" }),
              stroke: new Stroke({ color: "#ffffff", width: 3 }),
            }),
            text: new Text({
              text: "B",
              font: "bold 12px sans-serif",
              fill: new Fill({ color: "#ffffff" }),
              offsetY: -1,
            }),
          })
        );

        routeSource.current.addFeature(start);
        routeSource.current.addFeature(end);
      }
    });
  }, [routes, showRoutes]);

  // Update vehicles
  useEffect(() => {
    vehicleSource.current.clear();
    if (!showVehicles) return;

    vehicles.forEach((vehicle) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([vehicle.lng, vehicle.lat])),
        ...vehicle,
      });

      const color =
        vehicle.status === "active"
          ? "#22c55e"
          : vehicle.status === "idle"
          ? "#eab308"
          : "#6b7280";

      feature.setStyle(
        new Style({
          image: new Circle({
            radius: 12,
            fill: new Fill({ color }),
            stroke: new Stroke({ color: "#ffffff", width: 3 }),
          }),
          text: new Text({
            text: "🚛",
            font: "16px sans-serif",
            offsetY: 1,
          }),
        })
      );

      vehicleSource.current.addFeature(feature);
    });
  }, [vehicles, showVehicles]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapContainer}
        className="w-full h-full rounded-lg overflow-hidden"
      />
      <div ref={popupRef} className="absolute" />
    </div>
  );
}
