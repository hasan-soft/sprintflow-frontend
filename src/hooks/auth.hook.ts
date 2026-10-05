import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  googleOAuth,
  userLogin,
  userLogout,
  userRegistration,
} from "@/api";

export const currentUserQueryKey = ["current-user"] as const;

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userLogin,
    onSuccess: (result) => {
      queryClient.setQueryData(currentUserQueryKey, result.user);
    },
  });
}

export function useRegistration() {
  return useMutation({ mutationFn: userRegistration });
}

export function useGoogleOAuth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: googleOAuth,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: currentUserQueryKey }),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userLogout,
    onSuccess: () =>
      queryClient.removeQueries({ queryKey: currentUserQueryKey }),
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 60_000,
  });
}
