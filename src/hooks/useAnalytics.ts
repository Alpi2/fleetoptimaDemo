import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: () => apiClient.analytics.overview(),
  });
}

export function useDeliveryTrends(period: string = "month") {
  return useQuery({
    queryKey: ["analytics", "delivery-trends", period],
    queryFn: () => apiClient.analytics.deliveryTrends(period),
  });
}

export function useFleetEfficiency() {
  return useQuery({
    queryKey: ["analytics", "fleet-efficiency"],
    queryFn: () => apiClient.analytics.fleetEfficiency(),
  });
}

export function useEmissions(period: string = "month") {
  return useQuery({
    queryKey: ["analytics", "emissions", period],
    queryFn: () => apiClient.analytics.emissions(period),
  });
}
