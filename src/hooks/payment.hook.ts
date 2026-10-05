import { useQuery } from "@tanstack/react-query";
import { confirmPayment } from "@/api";

export function useConfirmPayment(sessionId: string) {
  return useQuery({
    queryKey: ["payment-confirmation", sessionId],
    queryFn: () => confirmPayment(sessionId),
    enabled: Boolean(sessionId),
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
