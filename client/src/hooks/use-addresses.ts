import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MOCK_ADDRESSES } from "@/lib/mockData";
import type { Address } from "@shared/schema";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let addressesStore = [...MOCK_ADDRESSES];

export function useAddresses() {
    return useQuery({
        queryKey: ["addresses"],
        queryFn: async () => {
            await delay(500);
            return addressesStore;
        },
    });
}

export function useCreateAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<Address>) => {
            await delay(800);
            const newAddress = {
                ...data,
                id: Math.floor(Math.random() * 10000) + 100,
            };
            addressesStore.push(newAddress as any);
            return newAddress;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
}

export function useUpdateAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Address> }) => {
            await delay(800);
            const index = addressesStore.findIndex((a) => a.id === id);
            if (index !== -1) {
                addressesStore[index] = { ...addressesStore[index], ...data };
            }
            return addressesStore[index];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
}

export function useDeleteAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await delay(500);
            addressesStore = addressesStore.filter((a) => a.id !== id);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
}

export function useSetDefaultAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await delay(500);
            addressesStore = addressesStore.map((a) => ({
                ...a,
                isDefault: a.id === id,
            }));
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
}
