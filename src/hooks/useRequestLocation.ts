import { useEffect, useState } from 'react';
import { getLocation } from 'zmp-sdk/apis';

interface UseRequestLocationProps {
  // onFail?: (params: {
  //   step: "allowInfo" | "flowOA" | "allowPhone";
  //   message?: string;
  //   error?: any;
  // }) => void;
  // onFinish?: (params: { userInfo: any }) => void;
  // cdpEventConfig?: {
  //   allowCallIdentify?: boolean;
  //   allowCallJoinGame?: boolean;
  //   pageCate: string;
  // };
}

/**
 * Custom hook to manage the flow of requesting Zalo permissions:
 * - Requesting user info (auto-permission)
 * - Checking OA follow status and following if needed
 * - Requesting phone number permission
 * - Emitting CDP events during each step
 *
 * @param {UseRequestZaloPermissionsProps} props - Configuration for permission request flow
 * @returns {{ requestZaloPermissions: () => Promise<void> }} - Main function to trigger permission requests
 */
export const useRequestLocation = (props: UseRequestLocationProps) => {
  const [location, setLocation] = useState<any>(null);
  const requestLocation = async () => {
    try {
      const { token } = await getLocation();
      console.log('🚀 ~ requestLocation ~ token:', token);
      setLocation(token || 'test');
    } catch (error) {
      console.log('🚀 ~ requestLocation ~ error:', error);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { location, isLoading: false };
};
