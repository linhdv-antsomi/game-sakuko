import { useLogin } from "queries";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { authenticationState } from "state";

export const useAuthentication = () => {
  const { mutateAsync: login, isPending: isLoggingIn } = useLogin({});
  const setAuthentication = useSetRecoilState(authenticationState);

  // Handlers
  const handleLogin = useCallback(async () => {
    const authRes = await login();
    const { accessToken } = authRes?.data || {};

    if (accessToken) {
      window.zma.setAccessToken(accessToken, true);
    }

    setAuthentication(authRes?.data);
  }, [login, setAuthentication]);

  return {
    handleLogin,
    isLoggingIn,
  };
};
