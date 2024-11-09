import axios from "@/config/axiosConfigs";
import { AuthFormInput, SignInErrorResponse } from "../types/authTypes";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (formValues: AuthFormInput) => {
      const response = await axios.post("/auth/signin", formValues);
      return response.data;
    },
    onError: (error: SignInErrorResponse) => {
      return error.response.data.error;
    },
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationFn: async () => {
      return await axios.get("auth/logout");
    },
  });
};

export const useRefreshToken = () => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["subscriptions-query"],
    queryFn: async () => {
      return await axios.get("/auth/refresh");
    },
  });

  return { data, isError, isLoading, isSuccess };
};
