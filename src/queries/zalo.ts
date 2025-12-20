import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "constant";
import { GetZaloInfoParams, zaloServices } from "services";

interface UseGetZaloInfoProps {
  params?: GetZaloInfoParams;
}

export const useGetZaloInfo = (_props?: UseGetZaloInfoProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.ZALO_INFO],
    queryFn: () => zaloServices.getZaloInfo(),
  });
};
