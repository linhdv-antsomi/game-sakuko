import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthenticationApi } from "schemas";
import { authServices } from "services";

export interface UseLoginProps {
  options?: UseMutationOptions<AuthenticationApi, Error>;
}

export const useLogin = (props: UseLoginProps) => {
  return useMutation({
    mutationFn: typeof window?.zma?.login === "function" ? window?.zma?.login : authServices.login, // authServices.login,
    ...props.options,
  });
};
