import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mockData";
import { Product } from "@shared/schema";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      await delay(800); // Fake loading
      return MOCK_PRODUCTS;
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      await delay(600);
      const product = MOCK_PRODUCTS.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      return product;
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      await delay(400);
      return MOCK_CATEGORIES;
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      await delay(1000);
      // In a real app, this would be a POST request
      const newProduct = { ...data, id: Math.random() };
      return newProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.products.list.path] });
    },
  });
}
