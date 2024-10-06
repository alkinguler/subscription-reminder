import React from "react";
import Button from "@/components/ui/Button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

const Login: React.FC = () => {
  const form = useForm();
  const { t } = useTranslation("translation", {
    keyPrefix: "login",
  });

  return (
    <>
      <Form {...form}>
        <Card className="m-4 p-4">
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
                    </FormItem>
                  </CardContent>
                </>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              onSubmit={() => {
                console.log("submit button clicked");
              }}
            >
              {t("submit", { keyPrefix: "common" })}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
};

export default Login;
