// Libraries
import { useEffect, useState } from "react";


interface UserInfoProps {}

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      try {
        if (!window.zma?.getUserInfo) {
          throw new Error("zma.getUserInfo not ready");
        }

        const info = window.zma.getUserInfo();
        if (!cancelled) setUserInfo(info);
      } catch (e) {
        if (!cancelled) setError(e as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  console.log("🚀 ~ useUserInfo ~:", {userInfo, isLoading, error});

  return { userInfo, isLoading, error };
};
