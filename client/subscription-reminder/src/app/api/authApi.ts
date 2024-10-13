import axios from "@/config/axiosConfigs";
import { AxiosResponse } from "axios";
import {
  AuthFormInput,
  SignInErrorResponse,
  SignInResponse,
} from "../types/authTypes";

export const signIn = (
  formValues: AuthFormInput,
  cb: (response: AxiosResponse<SignInResponse>) => unknown,
  errCb: (errorResponse: SignInErrorResponse) => unknown,
  reqTimeoutCb: () => unknown
) => {
  axios
    .post("/auth/signin", formValues)
    .then((response) => {
      cb(response);
    })
    .catch((errorResponse) => {
      console.error(errorResponse);
      errCb(errorResponse);
    })
    .catch(() => reqTimeoutCb());
};

export const logOut = (cb: () => unknown, errCb: () => unknown) => {
  axios
    .get("/auth/logout")
    .then(() => {
      cb();
    })
    .catch((errorResponse) => {
      console.error(errorResponse);
      errCb();
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
