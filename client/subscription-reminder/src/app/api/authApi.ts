import axios from "@/config/axiosConfigs";
import { AuthFormInput, SignInErrorResponse } from "../types/authTypes";
import { useMutation } from "@tanstack/react-query";

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
  // axios
  //   .get("/auth/logout")
  //   .then(() => {
  //     cb();
  //   })
  //   .catch((errorResponse) => {
  //     console.error(errorResponse);
  //     errCb();
  //   });

  return useMutation({
    mutationFn: async () => {
      return await axios.get("auth/logout");
    },
  });
};

export const refreshToken = (
  cb: () => unknown,
  errCb: (errCb: unknown) => unknown
) => {
  axios
    .get("/auth/refresh")
    .then(() => cb())
    .catch((err) => errCb(err));
};
