"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select-modified";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui/alert-dialog";

import { countryDialingCodes } from "@/data/countryDialingCodes";
import { cn, formatPhoneNumber, sleep } from "@/lib/utils";
import { ZtwoLetterCountryCodes } from "@/types/zod/twoLetterCountryCodes";
import Link from "next/link";
import { useId, useRef } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Слишком короткое имя. Как минимум 2 буквы",
  }),
  countryId: ZtwoLetterCountryCodes,
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]+$/, {
      //  \+? matches the plus symbol (escaped with a backslash \ because +
      // is a special character in regular expressions) and the ? means it
      // is optional.
      //  [0-9]+ matches one or more digits (0 through 9).
      message:
        "Телефонный номер может содержать только цифры и символ плюс в начале",
    })
    .min(10, {
      message: "Слишком короткий номер телефона. Необходимо минимум 10 цифр",
    })
    .max(15, {
      message: "Слишком длинный номер телефона. Максимум 15 цифр",
    }),
  isAcceptTerms: z.literal(true, {
    errorMap: () => ({
      message: "Необходимо принять условия",
    }),
  }),
});

type Props = {
  className?: string;
  submitButtonPosition?: "start" | "center" | "end";
  onSuccessAlertOk?: () => void;
};

export function CallbackForm({
  className,
  submitButtonPosition = "start",
  onSuccessAlertOk = () => {},
}: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      countryId: "KZ",
      phoneNumber: "",
      isAcceptTerms: true,
    },
  });

  const { isSubmitting, isSubmitSuccessful, errors } = form.formState;
  const phoneInputRef = useRef<HTMLInputElement>(null);
  // Мы используем useId т.к. это форма будет ренериться несколько раз на странице
  const nameInputId = useId();
  const phoneInputId = useId();
  const checkboxId = useId();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    const callingCode = countryDialingCodes[values.countryId].callingCode;
    const phoneNumber = values.phoneNumber;
    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : callingCode + phoneNumber;

    // ✅ This will be type-safe and validated.
    // console.log(values);
    const HOST =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_CRM_DEVELOPMENT_URL
        : process.env.NEXT_PUBLIC_CRM_PRODUCTION_URL;

    try {
      await sleep(1000);
      // Send data to API route
      const res = await fetch(`${HOST}/api/form-callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          phone: formattedPhoneNumber,
        }),
      });

      if (res.status === 400) {
        const error: { message: string; code: string; type: string } =
          await res.json();

        if (error.type === "REQUEST_ERROR") {
          throw new Error(JSON.stringify(error), {
            cause: "BAD_REQUEST",
          });
        }

        if (error.type === "VALIDATION_ERROR") {
          if (error.code === "PHONE_NUMBER_NOT_VALID") {
            form.setError("phoneNumber", {
              message: "Номера введен неверно",
            });
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.cause) {
          case "BAD_REQUEST":
            form.setError("root", {
              message: "Error: 400. Bad request",
            });
            break;
          default:
            form.setError("root", {
              message:
                "При отправке возникла ошибка. Мы уже работаем над её устранением. Пожалуйста, повторите позднее",
            });
            break;
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={nameInputId}>Имя</FormLabel>
              <FormControl>
                <Input
                  id={nameInputId}
                  placeholder="Ваше имя"
                  className="text-base"
                  type="text"
                  enterKeyHint="next"
                  disabled={isSubmitting}
                  onKeyDown={(e) => {
                    if (e.code == "Enter") {
                      e.preventDefault();
                      phoneInputRef.current?.focus();
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={phoneInputId}>Номер телефона</FormLabel>
              <FormControl>
                <div className="flex">
                  <FormField
                    control={form.control}
                    name="countryId"
                    render={({ field }) => (
                      <FormItem className={cn("space-y-0")}>
                        <FormLabel className="sr-only">
                          Телефонный код
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl
                            className={cn(
                              "w-max rounded-r-none text-base focus:relative",
                            )}
                          >
                            <SelectTrigger showIcon={false}>
                              <SelectValue placeholder="Выберите телефонный код страны">
                                {countryDialingCodes[field.value].flag}{" "}
                                {countryDialingCodes[field.value].callingCode}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            ref={(ref) => {
                              // https://github.com/radix-ui/primitives/issues/1658#issuecomment-1664079551
                              if (!ref) return;
                              ref.ontouchstart = (e) => {
                                e.preventDefault();
                              };
                            }}
                          >
                            {Object.keys(countryDialingCodes).map((key) => {
                              const country =
                                countryDialingCodes[
                                  key as z.infer<typeof ZtwoLetterCountryCodes>
                                ];
                              return (
                                <SelectItem
                                  key={country.id}
                                  value={country.id}
                                  textValue={country.name}
                                  disabled={isSubmitting}
                                >
                                  <span className="mr-2 inline-block w-16">
                                    {country.flag} {country.callingCode}
                                  </span>
                                  <span>{country.name}</span>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Input
                    placeholder="Ваш номер"
                    type="tel"
                    className="rounded-l-none border-l-0 text-base"
                    id={phoneInputId}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedText = e.clipboardData.getData("text");
                      const filteredText = formatPhoneNumber(pastedText);
                      form.setValue("phoneNumber", filteredText);
                    }}
                    {...field}
                    disabled={isSubmitting}
                    ref={phoneInputRef}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAcceptTerms"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    id={checkboxId}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormLabel htmlFor={checkboxId}>
                  Согласен на обработку персональных&nbsp;данных
                </FormLabel>
              </div>
              <FormMessage />
              <FormDescription>
                Ознакомиться с{" "}
                <Link href="/privacy-policy/" className="underline">
                  Политикой&nbsp;конфиденциальности
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <AlertDialog open={isSubmitSuccessful}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Спасибо!</AlertDialogTitle>
              <AlertDialogDescription>
                Заявка успешно отправлена. Мы уже получили её и свяжемся с вами
                в самое ближайшее время.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  form.reset();
                  onSuccessAlertOk();
                }}
              >
                Закрыть
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div
          className={cn("flex", {
            "justify-center": submitButtonPosition === "center",
            "justify-end": submitButtonPosition === "end",
          })}
        >
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправляется ..." : "Отправить"}
          </Button>
        </div>
        {errors.root?.message && (
          <p className="text-sm font-medium text-destructive">
            {errors.root.message}
          </p>
        )}
      </form>
    </Form>
  );
}
