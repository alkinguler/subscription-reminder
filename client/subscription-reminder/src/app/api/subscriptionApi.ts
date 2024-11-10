import axios from "@/config/axiosConfigs";
import { useAuthSlice } from "@/store/useStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Subscription } from "../types/subscriptionTypes";

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

export const useCreateSubscription = () => {
  return useMutation({
    mutationFn: async (formValues: Subscription) => {
      const response = await axios.post("/subscription/create", formValues);
      return response.data;
    },
    onError: (error) => {
      return error;
    },
  });
};
