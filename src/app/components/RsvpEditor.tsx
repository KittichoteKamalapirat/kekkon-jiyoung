import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { postToGoogleSheets } from "../../actions";
import SuperRadio, { SuperRadioItemProps } from "./SuperRadio/SuperRadio";
import MyText from "./MyText";
import { Input } from "./Input";
import HelpText from "./HelpText/HelpText";

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
  pickupNeed: z
    .string()
    .trim()
    .min(1, { message: "Please enter your last name." })
    .max(64, { message: "Should not be longer than 64 characters." }),
});

export type RsvpFormValues = z.infer<typeof schema>;

const RsvpEditor = ({ initialData, className }: Props) => {
  const t = useTranslations("rsvp");
  const onSubmit = async (data: RsvpFormValues) => {
    try {
      console.log("data", data);
      const reponse2 = await postToGoogleSheets(data);

      // console.log("response", reponse2.data);
    } catch (error) {
      console.error("error posting RSVP", error);
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
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<RsvpFormValues>({
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("w-[400px]", className)}
    >
      <MyText className="font-bold text-3xl text-center">Registration</MyText>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="">{t("firstNameLabel")}</label>
          <Input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
          />
          {errors.firstName && <HelpText message={errors.firstName.message} />}
        </div>

        <div>
          <label htmlFor="">{t("lastNameLabel")}</label>
          <Input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
          />
          {errors.lastName && <HelpText message={errors.lastName.message} />}
        </div>

        <div>
          <MyText>{t("ceremonyParticipationQuestion")}</MyText>
          <SuperRadio
            orientation="HORIZONTAL"
            className="flex w-full gap-4"
            items={ceremonyOptions}
            {...register("joinCeremony")}
          />
        </div>

        <div>
          <MyText>{t("pickupQuestion")}</MyText>
          <SuperRadio
            orientation="HORIZONTAL"
            className="flex w-full gap-4"
            items={pickupServiceOptions}
            {...register("pickupNeed")}
          />
        </div>

        <Button variant="default" type="submit">
          {t("ctaLabel")}
        </Button>
      </div>
      {/* <Button
        label="Save"
        type="submit"
        className="mt-4"
        width="FULL"
        isLoading={isSubmitting}

        // disabled={!isDirty}
      /> */}
    </form>
  );
};
export default RsvpEditor;
