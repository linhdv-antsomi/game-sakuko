import { useEffect, useState } from "react";

export const useAppConfig = () => {
  const [appSettings, setAppSettings] = useState<any>(null);
  const [gameValidation, setGameValidation] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      try {
        if (
          !window?.zma?.config?.appSettings ||
          !window?.zma?.config?.gameValidation
        ) {
          throw new Error("zma.config.appSettings not ready");
        }

        const appSettings = window?.zma?.config?.appSettings;
        const gameValidation = window?.zma?.config?.gameValidation;
        if (!cancelled) setAppSettings(appSettings);
        if (!cancelled) setGameValidation(gameValidation);
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

  console.log("🚀 ~ useAppConfig ~:", {
    appSettings,
    gameValidation,
    isLoading,
    error,
  });

  return { appSettings, gameValidation, isLoading, error };
};
