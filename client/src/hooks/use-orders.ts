import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { MOCK_ORDERS } from "@/lib/mockData";
import { Order } from "@shared/schema";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useOrders() {
  return useQuery({
    queryKey: [api.orders.list.path],
    queryFn: async () => {
      await delay(1000);
      return MOCK_ORDERS;
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      await delay(1500); // Simulate checkout processing
      return { ...data, id: Math.floor(Math.random() * 1000) + 2000, status: "pending", date: new Date().toISOString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
    },
  });
}
