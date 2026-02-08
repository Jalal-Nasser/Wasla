import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MOCK_WISHLIST_ITEMS, MOCK_PRODUCTS } from "@/lib/mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let wishlistStore = [...MOCK_WISHLIST_ITEMS];

export function useWishlist() {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: async () => {
            await delay(500);
            // Return full product objects for wishlist items
            return MOCK_PRODUCTS.filter((product) => wishlistStore.includes(product.id));
        },
    });
}

export function useAddToWishlist() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productId: number) => {
            await delay(500);
            if (!wishlistStore.includes(productId)) {
                wishlistStore.push(productId);
            }
            return productId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
}

export function useRemoveFromWishlist() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productId: number) => {
            await delay(500);
            wishlistStore = wishlistStore.filter((id) => id !== productId);
            return productId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
}

export function useClearWishlist() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            await delay(500);
            wishlistStore = [];
            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
}
