"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { isDirty, z } from "zod";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitErrorCode, postToGoogleSheets } from "../../actions";
import HelpText from "./HelpText/HelpText";
import { Input } from "./Input";
import MyText from "./MyText";
import SuperRadio, { SuperRadioItemProps } from "./SuperRadio/SuperRadio";

interface Props {
  initialData: RsvpFormValues;
  className?: string;
}

const schema = z.object({
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
  joinCeremony: z
    .string()
    .trim()
    .min(1, { message: "Please enter your last name." })
    .max(64, { message: "Should not be longer than 64 characters." }),
  needPickup: z
    .string()
    .trim()
    .min(1, { message: "Please enter your last name." })
    .max(64, { message: "Should not be longer than 64 characters." }),
});

export type RsvpFormValues = z.infer<typeof schema>;

const RsvpEditor = ({ initialData, className }: Props) => {
  const t = useTranslations("rsvp");

  const successErrorMessage = t("successfullySubmitted");
  const unknownErrorMessage = t("unknownError");

  const alreadySubmittedErrorMessage = t("alreadySubmittedError");
  const [submitErrorCode, setSubmitErrorCode] = useState<
    SubmitErrorCode | undefined
  >();
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: RsvpFormValues) => {
    try {
      const response = await postToGoogleSheets(data);

      if (response.success) {
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

      value: "need",
    },
    {
      mainLabel: t("pickupAnswer2Label"),

      value: "no_need",
    },
  ];

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    watch,
    setValue,
  } = useForm<RsvpFormValues>({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  console.log("errors", errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("container md:max-w-[400px] mb-12", className)}
    >
      <MyText className="font-bold text-3xl text-center">Registration</MyText>
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label className="ml-1">{t("firstNameLabel")}</label>
          <Input
            type="text"
            {...register("firstName")}
            placeholder={t("firstNamePlaceholder")}
          />
          {errors.firstName && <HelpText message={errors.firstName.message} />}
        </div>
        <div className="mt-2">
          <label className="ml-1">{t("lastNameLabel")}</label>
          <Input
            type="text"
            {...register("lastName")}
            placeholder={t("lastNamePlaceholder")}
          />
          {errors.lastName && <HelpText message={errors.lastName.message} />}
        </div>
        <div className="mt-2">
          <MyText className="ml-1">{t("ceremonyParticipationQuestion")}</MyText>
          <SuperRadio
            orientation="HORIZONTAL"
            className="flex flex-col md:flex-row w-full gap-2"
            items={ceremonyOptions}
            {...register("joinCeremony")}
          />
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

        {submitErrorCode === "already_submitted" && (
          <MyText className="text-error">{alreadySubmittedErrorMessage}</MyText>
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
    </form>
  );
};
export default RsvpEditor;
