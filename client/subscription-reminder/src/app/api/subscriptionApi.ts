import axios from "@/config/axiosConfigs";
import { useAuthSlice } from "@/store/useStore";
import { useQuery } from "@tanstack/react-query";

export const useSubscriptionQuery = () => {
  const { token } = useAuthSlice();
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["subscriptions-query"],
    queryFn: async () => {
      return await axios.get("subscription/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  });

  return { data, isError, isLoading, isSuccess };
};
