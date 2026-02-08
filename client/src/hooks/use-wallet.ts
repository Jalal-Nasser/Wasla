import { useQuery } from "@tanstack/react-query";
import { MOCK_WALLET_BALANCE, MOCK_WALLET_TRANSACTIONS, WalletTransaction } from "@/lib/mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useWalletBalance() {
    return useQuery({
        queryKey: ["wallet", "balance"],
        queryFn: async () => {
            await delay(500);
            return MOCK_WALLET_BALANCE;
        },
    });
}

export function useWalletTransactions(filter?: "refund" | "purchase" | "cashback" | "bonus") {
    return useQuery({
        queryKey: ["wallet", "transactions", filter],
        queryFn: async () => {
            await delay(500);
            if (filter) {
                return MOCK_WALLET_TRANSACTIONS.filter((t) => t.type === filter);
            }
            return MOCK_WALLET_TRANSACTIONS;
        },
    });
}
