import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthenticationApi } from "schemas";
import { authServices } from "services";

export interface UseLoginProps {
  options?: UseMutationOptions<AuthenticationApi, Error>;
}

export const useLogin = (props: UseLoginProps) => {
  return useMutation({
    mutationFn: authServices.login,
    ...props.options,
  });
};
