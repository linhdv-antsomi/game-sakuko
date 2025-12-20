// Libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SystemNotificationModal } from "components";
import { APP_CONFIG } from "constant";
import { AudioProvider } from "contexts";
import { useNavigateWithSearch } from "hooks";
import { MotionConfig } from "motion/react";
import React from "react";
import { useImmer } from "use-immer";

interface ProvidersProps {}

export const Providers: React.FC<React.PropsWithChildren<ProvidersProps>> = (
  props
) => {
  const { children } = props;
  const [state, setState] = useImmer({
    errorMessage: "",
  });

  const { errorMessage } = state;

  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 60 * 1000,
        refetchOnReconnect: true,
        throwOnError(error) {
          setState((draft) => {
            draft.errorMessage = error?.message;
          });

          return false;
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider initialVolume={0.6}>
        <MotionConfig
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {children}
        </MotionConfig>
      </AudioProvider>

      <SystemNotificationModal
        showCloseButton={false}
        visible={!!errorMessage}
        title="Thông báo"
        description={
          errorMessage || APP_CONFIG.SYSTEM_ERROR_MESSAGES.maintenance
        }
        retryButtonProps={{
          onClick: () => {
            setState((draft) => {
              draft.errorMessage = "";
            });
            window.location.reload();
          },
        }}
        className="notify-provider"
      />
    </QueryClientProvider>
  );
};
