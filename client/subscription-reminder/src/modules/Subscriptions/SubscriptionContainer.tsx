import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Plus, ChevronsUpDown, Check } from "lucide-react";
import Button from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn, toLowerAndTrimSpaces } from "@/lib/utils";
import DisneyPlusIcon from "@/assets/icons/DisneyPlus";
import NetflixIcon from "@/assets/icons/Netflix";
import { useSubscriptionQuery } from "@/app/api/subscriptionApi";
import YoutubeIcon from "@/assets/icons/YouTube";

import { Subscription } from "@/app/types/subscriptionTypes.js";
import { getThemeColors } from "@/theme/utils/themeUtils";

const SubscriptionContainer = () => {
  const [open, setOpen] = React.useState(false);
  const { t: subscriptionTranslation } = useTranslation("translation", {
    keyPrefix: "subscription",
  });
  const { t: commonTranslation } = useTranslation("translation", {
    keyPrefix: "common",
  });

  const { data, isError, isLoading, isSuccess } = useSubscriptionQuery();
  console.log(data, isError, isLoading, isSuccess);

  const [subscriptions] = useState<Subscription[]>([
    {
      id: 1,
      name: "Netflix",
      price: 9.99,
      duration: "monthly",
    },
    {
      id: 2,
      name: "Youtube",
      price: 19.99,
      duration: "monthly",
    },
    {
      id: 3,
      name: "Disney +",
      price: 49.99,
      duration: "monthly",
    },
    {
      id: 4,
      name: "Student Plan",
      price: 4.99,
      duration: "monthly",
    },
    {
      id: 5,
      name: "Annual Basic",
      price: 99.99,
      duration: "yearly",
    },
  ]);

  const iconList: Record<string, React.ElementType> = {
    ["disney+"]: DisneyPlusIcon,
    ["netflix"]: NetflixIcon,
    ["youtube"]: YoutubeIcon,
    DEFAULT: CreditCard,
  };

  interface ComboboxPairs {
    key: string;
    value: string;
  }

  const ComboboxDropdownOptions: ComboboxPairs[] = [
    {
      key: "monthly",
      value: subscriptionTranslation("durationOptions.monthly"),
    },
    { key: "yearly", value: subscriptionTranslation("durationOptions.yearly") },
  ];

  const formSchema = z.object({
    name: z.string().min(1, commonTranslation("required")),
    price: z.string().min(1, commonTranslation("required")),
    duration: z.string().min(1, commonTranslation("required")),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      duration: "",
    },
  });

  const iconClassInjector = ({
    IconComponent,
    style = "",
    iconColor = "",
  }: {
    IconComponent: React.ElementType;
    style?: string;
    iconColor?: string;
  }) => {
    const iconClass = `h-10 w-10 p-1 self-end md:mt-1 rounded-md ${style}`;
    return (
      <IconComponent className={`${iconClass} ${style}`} color={iconColor} />
    );
  };

  const generateTableIcon = (subscriptionName: string) => {
    const Icon = iconList[subscriptionName] ?? iconList["DEFAULT"];
    console.log(Icon);
    return iconClassInjector({
      IconComponent: Icon,
      style: "justify-self-center",
      iconColor: getThemeColors().primary.DEFAULT,
    });
  };

  const generateNameBoundedIcon = (name: string): JSX.Element => {
    const IconComponent = iconList[name] ?? iconList["DEFAULT"];
    const iconColor = iconList[name]
      ? name === "youtube"
        ? "#ff0033"
        : "#136878"
      : "black";
    const style =
      name === "netflix"
        ? "border border-primary dark:outline-none dark:border-0 bg-black"
        : "border border-primary dark:outline-none dark:border-0 bg-white";

    return iconClassInjector({
      IconComponent,
      iconColor,
      style,
    });
  };

  // TODO: will be implemented.
  // const handleSubmit = () => {};

  const formFieldRenderer = <T extends FieldValues>(
    formFieldOptions: ControllerRenderProps<T, FieldPath<T>>
  ) => {
    const formFields: Record<string, () => JSX.Element> = {
      // name renderer
      name: () => (
        <div className="flex flex-row gap-2">
          {generateNameBoundedIcon(
            toLowerAndTrimSpaces(formFieldOptions.value)
          )}
          <FormItem className="flex-1">
            <FormLabel>{subscriptionTranslation("name")}</FormLabel>
            <FormControl>
              <Input
                placeholder={subscriptionTranslation("placeholder.name")}
                {...formFieldOptions}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      ),
      // price renderer
      price: () => (
        <FormItem>
          <FormLabel>{subscriptionTranslation("price")}</FormLabel>
          <FormControl>
            <Input
              placeholder={subscriptionTranslation("placeholder.price")}
              type="number"
              {...formFieldOptions}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      ),
      // duration renderer
      duration: () => (
        <FormItem className="flex flex-col md:block">
          <FormLabel>{subscriptionTranslation("duration")}</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-auto md:min-w-[200px] justify-between"
                >
                  {formFieldOptions.value
                    ? ComboboxDropdownOptions.find(
                        (option) => option.key === formFieldOptions.value
                      )?.value
                    : subscriptionTranslation("placeholder.duration")}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder={commonTranslation("selectPlaceholder")}
                  />
                  <CommandList>
                    <CommandGroup>
                      {ComboboxDropdownOptions.map((option) => (
                        <CommandItem
                          key={option.key}
                          value={option.key}
                          onSelect={(currentValue) => {
                            formFieldOptions.onChange(
                              currentValue === formFieldOptions.value
                                ? ""
                                : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formFieldOptions.value === option.key
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.value}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      ),
    };

    return formFields[formFieldOptions.name] ? (
      formFields[formFieldOptions.name]()
    ) : (
      <div>Field not found</div>
    );
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    return () => {
      form.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen]);

  return (
    <Card className="w-[100vw] scale-90 max-w-3xl mx-auto sm:scale-100 md:min-w-[40vw]">
      <CardHeader className="flex flex-row items-center justify-between space-x-12">
        <CardTitle>
          {subscriptionTranslation("subscriptionManagement")}
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />{" "}
              {subscriptionTranslation("addSubscription")}
            </Button>
          </DialogTrigger>
          <DialogContent className="scale-90 md:scale-100">
            <div>
              <Form {...form}>
                <div className="flex flex-col my-12 gap-5 md:flex-row">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => formFieldRenderer(field)}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => formFieldRenderer(field)}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => formFieldRenderer(field)}
                  />
                </div>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                  {commonTranslation("submit")}
                </Button>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{subscriptionTranslation("icon")}</TableHead>
              <TableHead>{subscriptionTranslation("name")}</TableHead>
              <TableHead>{subscriptionTranslation("price")}</TableHead>
              <TableHead>{subscriptionTranslation("duration")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>
                  {generateTableIcon(toLowerAndTrimSpaces(sub.name))}
                </TableCell>
                <TableCell>{sub.name}</TableCell>
                <TableCell>${sub.price.toFixed(2)}</TableCell>
                <TableCell>
                  {subscriptionTranslation(`durationOptions.${sub.duration}`)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubscriptionContainer;
