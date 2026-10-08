import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  demoLogin,
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
      queryClient.invalidateQueries({ queryKey: currentUserQueryKey });
    },
  });
}

export function useDemoLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (role: "ADMIN" | "MANAGER" | "MEMBER") => demoLogin(role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currentUserQueryKey });
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

export const useAuthMe = useCurrentUser;
export const useUserLogin = useLogin;
export const useUserLogout = useLogout;
