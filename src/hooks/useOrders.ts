import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiClient,
  Order,
  CreateOrderDto,
  UpdateOrderDto,
} from "@/lib/api-client";

export function useOrders(params?: { status?: string; page?: number }) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => apiClient.orders.list(params),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => apiClient.orders.get(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderDto) => apiClient.orders.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderDto }) =>
      apiClient.orders.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", variables.id] });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.orders.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
