"use client";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { set, useForm } from "react-hook-form";
import { isDirty, z } from "zod";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SubmitErrorCode, postToGoogleSheets } from "../../actions";
import HelpText from "./HelpText/HelpText";
import { Input } from "./Input";
import MyText from "./MyText";
import SuperRadio, { SuperRadioItemProps } from "./SuperRadio/SuperRadio";
import { cn } from "../../lib/utils";
import Image from "next/image";

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
  } = useForm<RsvpFormValues>({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  const isJoin = watch("joinCeremony") === "presence";

  console.log("isJoin", isJoin);
  console.log("runConfetti", runConfetti);

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
      <div className={clsx("text-center container py-12")}>
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("container md:max-w-[400px] mb-12", className)}
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

      <MyText className="font-bold text-3xl text-center">{t("title")}</MyText>
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
