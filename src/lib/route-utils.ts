interface RoutePoint {
  lat: number;
  lng: number;
}

// Haversine formula - iki koordinat arası mesafe (km)
export function calculateDistance(
  point1: RoutePoint,
  point2: RoutePoint
): number {
  const R = 6371; // Dünya yarıçapı (km)
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Toplam rota mesafesi
export function calculateTotalDistance(points: RoutePoint[]): number {
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    total += calculateDistance(points[i], points[i + 1]);
  }
  return total;
}

// Tahmini süre (ortalama hız baz alınarak)
export function estimateDuration(
  distanceKm: number,
  avgSpeedKmh: number = 40
): number {
  return (distanceKm / avgSpeedKmh) * 60; // dakika cinsinden
}

// Formatlı mesafe
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

// Formatlı süre
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} dk`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours} sa ${mins} dk`;
}
