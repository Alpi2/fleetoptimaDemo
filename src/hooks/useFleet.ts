import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiClient,
  Vehicle,
  CreateVehicleDto,
  UpdateVehicleDto,
} from "@/lib/api-client";

// Vehicles hooks
export function useVehicles() {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: () => apiClient.vehicles.list(),
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: ["vehicles", id],
    queryFn: () => apiClient.vehicles.get(id),
    enabled: !!id,
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVehicleDto) => apiClient.vehicles.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVehicleDto }) =>
      apiClient.vehicles.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles", variables.id] });
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.vehicles.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}
