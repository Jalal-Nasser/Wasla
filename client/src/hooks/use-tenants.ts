import { useQuery } from "@tanstack/react-query";
import { MOCK_TENANTS } from "@/lib/mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useTenants() {
  return useQuery({
    queryKey: ["/api/tenants"],
    queryFn: async () => {
      await delay(700);
      return MOCK_TENANTS;
    },
  });
}
