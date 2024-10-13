import React, { useEffect } from "react";
import Button from "@/components/ui/Button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form/form";
import { Input } from "@/components/ui/Input/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/config/axiosConfigs";
import { useToast } from "@/components/ui/Toaster/hooks/use-toast";
import useAuthStore from "@/store/auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/app/api/authApi";
import { SignInErrorResponse, SignInResponse } from "@/app/types/authTypes";
import { AxiosResponse } from "axios";

const Login: React.FC = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "login",
  });
  const { token, setUsername, setToken, resetAuthData } = useAuthStore();
  const navigate = useNavigate();
  const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { toast } = useToast();

  const onSignInSuccess = (authResponse: AxiosResponse<SignInResponse>) => {
    toast({
      title: t("success", {
        keyPrefix: "common",
      }),
      variant: "successful",
      icon: true,
    });
    setUsername(authResponse.data.username);
    setToken(authResponse.data.accessToken);
    navigate("/dashboard");
  };

  const onSignInError = (response: SignInErrorResponse) => {
    toast({
      title: t("titles.SOMETHING_WENT_WRONG", { keyPrefix: "error" }),
      description: t(`errorKeys.${response.response.data.error}`, {
        keyPrefix: "error",
      }),
      variant: "destructive",
      icon: true,
    });
  };

  const onSignInTimeout = () => {
    toast({
      title: t("titles.SOMETHING_WENT_WRONG", { keyPrefix: "error" }),
      description: "error occured",
      variant: "destructive",
      icon: true,
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn(values, onSignInSuccess, onSignInError, onSignInTimeout);
  }

  useEffect(() => {
    if (token) {
      axios
        .get("/auth/refresh")
        .then(() => navigate("/dashboard"))
        .catch(() => resetAuthData());
    }
  });
  return (
    <>
      <Form {...form}>
        <Card className="mx-4 p-4">
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <>
                  <CardContent className="text-left">
                    <FormItem>
                      <FormLabel>{t("username")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("placeholders.username")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </CardContent>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <CardContent className="text-left">
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("placeholders.password")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </CardContent>
                </>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              {t("submit", { keyPrefix: "common" })}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
};

export default Login;
