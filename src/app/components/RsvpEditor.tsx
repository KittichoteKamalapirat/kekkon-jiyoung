"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { toast } from "sonner";

import { FieldErrorsImpl, useFieldArray, useForm } from "react-hook-form";
import { isDirty, z } from "zod";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitErrorCode, postToGoogleSheets } from "../../actions";
import { cn } from "../../lib/utils";
import HelpText from "./HelpText/HelpText";
import { Input } from "./Input";
import MyText from "./MyText";
import SuperRadio, { SuperRadioItemProps } from "./SuperRadio/SuperRadio";

interface Props {
  initialData: RsvpFormValues;
  className?: string;
}

const attendantSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your first name." })
    .max(64, { message: "Should not be longer than 24 characters." }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your last name." })
    .max(64, { message: "Should not be longer than 64 characters." }),
});

const noNeedBusSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your first name." })
    .max(64, { message: "Should not be longer than 24 characters." }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your last name." })
    .max(64, { message: "Should not be longer than 64 characters." }),
  relationship: z
    .string()
    .trim()
    .min(1, { message: "Please enter your relationship." })
    .max(64, { message: "Should not be longer than 64 characters." }),
  joinCeremony: z
    .string()
    .trim()
    .min(1, { message: "Please enter your last name." })
    .max(64, { message: "Should not be longer than 64 characters." }),
  attendantNum: z
    .number()
    .int()
    .min(1, { message: "Has to be >= 1." })
    .default(10),
  attendants: z.array(attendantSchema),
  needPickup: z.literal("no"),
});

const needBusSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your first name." })
    .max(64, { message: "Should not be longer than 24 characters." }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your last name." })
    .max(64, { message: "Should not be longer than 64 characters." }),
  relationship: z
    .string()
    .trim()
    .min(1, { message: "Please enter your relationship." })
    .max(64, { message: "Should not be longer than 64 characters." }),
  joinCeremony: z
    .string()
    .trim()
    .min(1, { message: "Please enter your last name." })
    .max(64, { message: "Should not be longer than 64 characters." }),
  attendantNum: z.number().int().min(1, { message: "Has to be >= 1." }),
  attendants: z.array(attendantSchema),
  needPickup: z.literal("yes"),
  pickupSpot: z.enum(["Gimcheon_Gumi", "Park_Hotel"] as const, {
    errorMap: (issue, ctx) => {
      return { message: "Please select your pickup spot" };
    },
  }),
});

const schema = z.discriminatedUnion("needPickup", [
  noNeedBusSchema,
  needBusSchema,
]);
type NoNeedBusFormData = z.infer<typeof noNeedBusSchema>;
type NeedBusFormData = z.infer<typeof needBusSchema>;
type FormData = z.infer<typeof schema>;

export type RsvpFormValues = z.infer<typeof schema>;

const RsvpEditor = ({ initialData, className }: Props) => {
  const t = useTranslations("rsvp");
  const { width, height } = useWindowSize();
  const [runConfetti, setRunConfetti] = useState<boolean>(false);
  const successErrorMessage = t("successfullySubmitted");
  const unknownErrorMessage = t("unknownError");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const alreadySubmittedErrorMessage = t("alreadySubmittedError");
  const [submitErrorCode, setSubmitErrorCode] = useState<
    SubmitErrorCode | undefined
  >();
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: RsvpFormValues) => {
    try {
      const response = await postToGoogleSheets(data);

      if (response.success) {
        setIsSuccess(true);
        setSubmitErrorCode(undefined);
        toast.success(successErrorMessage);
      } else {
        setSubmitErrorCode(response.errorCode);
        toast.error(
          response.errorCode === "already_submitted"
            ? alreadySubmittedErrorMessage
            : unknownErrorMessage
        );
      }
      // setIsSubmitting(false);
    } catch (error) {
      console.error("error posting RSVP", error);
      // console.error("error posting RSVP", error.message);
      setSubmitErrorCode("unknown_error");
      // setIsSubmitting(false);
    }
  };

  const ceremonyOptions: SuperRadioItemProps[] = [
    {
      mainLabel: t("ceremonyParticipationAnswer1Label"),

      value: "presence",
    },
    {
      mainLabel: t("ceremonyParticipationAnswer2Label"),

      value: "absence",
    },
  ];
  const pickupServiceOptions: SuperRadioItemProps[] = [
    {
      mainLabel: t("pickupAnswer1Label"),

      value: "yes",
    },
    {
      mainLabel: t("pickupAnswer2Label"),

      value: "no",
    },
  ];

  const pickupSpotOptions: SuperRadioItemProps<
    "Gimcheon_Gumi" | "Park_Hotel"
  >[] = [
    {
      mainLabel: t("pickupSpotGumiLabel"),
      value: "Gimcheon_Gumi",
    },
    {
      mainLabel: t("pickupSpotParkLabel"),
      value: "Park_Hotel",
    },
  ];

  const form = useForm<RsvpFormValues>({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  const { fields, append, replace, prepend, remove, swap, move, insert } =
    useFieldArray({
      control: form.control,
      name: "attendants",
    });

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    watch,
    control,
  } = form;

  const isJoin = watch("joinCeremony") === "presence";

  const attendantNum = watch("attendantNum");

  console.log("errors", errors);
  console.log("enum", watch("pickupSpot"));
  // attendants list
  useEffect(() => {
    if (!attendantNum || attendantNum <= 0) return;

    // clear
    for (let i = 0; i < fields.length - 1; i++) {
      remove(i);
    }

    // append

    const newItems = Array.from(Array(attendantNum).keys()).map((i) => {
      console.log("i", i);
      return {
        firstName: i === 0 ? watch("firstName") : "",
        lastName: i === 0 ? watch("lastName") : "",
      };
    });
    replace(newItems);
  }, [attendantNum]);
  useEffect(() => {
    // if (!isJoin) {
    //   return
    // }
    setRunConfetti(isJoin);
    const timeoutId = setTimeout(() => setRunConfetti(false), 3000);

    return () => clearTimeout(timeoutId);
  }, [isJoin]);

  if (isSuccess)
    return (
      <div
        className={clsx(
          "text-center container py-12 ",
          isSuccess ? "opacity-100 translate-y-0" : "translate-y-1/4 opacity-0"
        )}
      >
        <h1 className="text-lg font-bold">{t("afterSubmitTitle")}</h1>
        <p className="mt-2">{t("afterSubmitDescription")}</p>
        <div className="relative w-fit mx-auto">
          <p
            className={clsx(
              "absolute animate-wiggle-heavy",
              "top-[-20px] left-[-20px] text-[40px]",
              "lg:top-[-40px] lg:left-[-30px]  lg:text-[60px] "
            )}
          >
            👋
          </p>
          <Image
            alt="Japanese"
            src="/images/looking-forward.webp"
            width={400}
            height={100}
            className="rounded-lg mt-4 w-full lg:w-[600px]"
          />
        </div>
      </div>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx("container md:max-w-[600px] mb-12", className)}
      >
        {/* need relative on higher component */}
        {runConfetti && (
          <Confetti
            width={width}
            height={height}
            colors={[
              "#fff1f2", // primary 50
              "#ffe4e6", // primary 100
              "#fecdd3", // primary 200
              "#fda4af", // primary 300
              "#fb7185", // primary 400
              "#f43f5e", // primary 500
            ]}
            // opacity={0.8}
            gravity={0.4}
            // numberOfPieces={2000}
            // run={runConfetti}
            recycle={true} // whether to loop or not
            confettiSource={{
              x: 0,
              y: -height,
              w: width,
              h: height,
            }}
          />
        )}
        <div>
          <MyText className="font-bold text-3xl text-center">
            {t("title")}
          </MyText>
          {t("description1") && (
            <MyText className="text-md mt-4">{t("description1")}</MyText>
          )}
          {t("description2") && (
            <MyText className="text-md mt-2">{t("description2")}</MyText>
          )}
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label className="ml-1">{t("lastNameLabel")}</label>
              <Input
                type="text"
                {...register("lastName")}
                placeholder={t("lastNamePlaceholder")}
              />
              {errors.lastName && (
                <HelpText message={errors.lastName.message} />
              )}
            </div>

            <div className="mt-2">
              <label className="ml-1">{t("firstNameLabel")}</label>
              <Input
                type="text"
                {...register("firstName")}
                placeholder={t("firstNamePlaceholder")}
              />
              {errors.firstName && (
                <HelpText message={errors.firstName.message} />
              )}
            </div>

            <div className="mt-2">
              <label className="ml-1">{t("relationshipLabel")}</label>
              <FormField
                control={control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("relationshipPlaceholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bride_relative">
                          {t("brideRelativeLabel")}
                        </SelectItem>
                        <SelectItem value="bride_friend">
                          {t("brideFriendLabel")}
                        </SelectItem>
                        <SelectItem value="bride_coworker">
                          {t("brideCoworkerLabel")}
                        </SelectItem>

                        <SelectItem value="groom_relative">
                          {t("groomRelativeLabel")}
                        </SelectItem>
                        <SelectItem value="groom_friend">
                          {t("groomFriendLabel")}
                        </SelectItem>
                        <SelectItem value="groom_coworker">
                          {t("groomCoworkerLabel")}
                        </SelectItem>

                        <SelectItem value="others">
                          {t("relationshipOthersLabel")}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-2">
              <label className="ml-1">{t("attendantNumQuestion")}</label>
              <Input
                type="number"
                {...register("attendantNum", { valueAsNumber: true })}
                placeholder="1"
                defaultValue={1}
                min={1}
              />
              {errors.attendantNum && (
                <HelpText message={errors.attendantNum.message} />
              )}
            </div>

            <div className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={cn(
                    "flex gap-4 items-start lg:mx-8",
                    attendantNum === 1 && index === 0 && "hidden"
                  )}
                >
                  <p className="mt-2">{index + 1}.</p>
                  <div
                    className={cn(
                      "grid grid-cols-1 lg:grid-cols-2 w-full gap-2 items-center"
                    )}
                  >
                    {/* last name */}
                    <div>
                      <Input
                        type="text"
                        {...register(`attendants.${index}.lastName`)}
                        value={index === 0 ? watch("lastName") : undefined}
                        disabled={index === 0}
                        placeholder={t("lastNamePlaceholder")}
                      />
                      {errors.attendants?.[index]?.lastName && (
                        <HelpText
                          message={
                            errors.attendants?.[index]?.lastName?.message
                          }
                        />
                      )}
                    </div>
                    {/* first name */}
                    <div>
                      <Input
                        type="text"
                        value={index === 0 ? watch("firstName") : undefined}
                        disabled={index === 0}
                        {...register(`attendants.${index}.firstName`)}
                        placeholder={t("firstNamePlaceholder")}
                      />
                      {errors.attendants?.[index]?.firstName && (
                        <HelpText
                          message={
                            errors.attendants?.[index]?.firstName?.message
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <MyText className="ml-1">
                {t("ceremonyParticipationQuestion")}
              </MyText>
              <SuperRadio
                orientation="HORIZONTAL"
                className="flex flex-col md:flex-row w-full gap-2"
                items={ceremonyOptions}
                {...register("joinCeremony")}
              />
              <p
                className={cn(
                  "text-sm mt-4",
                  "transition-opacity",
                  watch("joinCeremony") === "presence" ? "block" : "hidden"
                )}
              >
                * {t("arrivalTime")}
              </p>
            </div>
            <div className="mt-2">
              <MyText className="ml-1">{t("pickupQuestion")}</MyText>
              <SuperRadio
                orientation="HORIZONTAL"
                className="flex flex-col md:flex-row w-full gap-2"
                items={pickupServiceOptions}
                {...register("needPickup")}
              />
            </div>

            {watch("needPickup") === "yes" && (
              <div className="mt-2">
                <MyText className="ml-1">{t("pickupSpotQuestion")}</MyText>
                <SuperRadio
                  orientation="HORIZONTAL"
                  className="flex flex-col w-full gap-2"
                  items={pickupSpotOptions}
                  {...register("pickupSpot", { shouldUnregister: true })}
                />

                {(errors as FieldErrorsImpl<NeedBusFormData>).pickupSpot && (
                  <HelpText
                    message={
                      (errors as FieldErrorsImpl<NeedBusFormData>).pickupSpot
                        ?.message
                    }
                  />
                )}
              </div>
            )}

            {submitErrorCode === "already_submitted" && (
              <MyText className="text-error">
                {alreadySubmittedErrorMessage}
              </MyText>
            )}
            {submitErrorCode === "unknown_error" && (
              <MyText className="text-error">{unknownErrorMessage}</MyText>
            )}
            <Button
              variant="default"
              type="submit"
              disabled={!isDirty || isSubmitting}
            >
              {!isSubmitting ? t("ctaLabel") : t("ctaLabelLoading")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default RsvpEditor;
