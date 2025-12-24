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
    const { accessToken, user: { phone } } = authRes?.data || {};

    if (accessToken) {
      window.zma.setAccessToken(accessToken, true);
    }

    if (phone) {
      window.zma.setPhoneNumber(phone, true);
    }

    setAuthentication(authRes?.data);
  }, [login, setAuthentication]);

  return {
    handleLogin,
    isLoggingIn,
  };
};
