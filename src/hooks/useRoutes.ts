import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiClient,
  Route,
  OptimizeRoutesDto,
  OptimizationResult,
} from "@/lib/api-client";

export function useRoutes() {
  return useQuery({
    queryKey: ["routes"],
    queryFn: () => apiClient.routes.list(),
  });
}

export function useRoute(id: string) {
  return useQuery({
    queryKey: ["routes", id],
    queryFn: () => apiClient.routes.get(id),
    enabled: !!id,
  });
}

export function useOptimizeRoutes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OptimizeRoutesDto) => apiClient.routes.optimize(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
