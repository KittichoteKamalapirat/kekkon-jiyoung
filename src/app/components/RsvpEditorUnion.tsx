"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { FieldErrorsImpl, useFieldArray, useForm } from "react-hook-form";
import { isDirty, z } from "zod";

import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitErrorCode, postToGoogleSheets } from "../../actions";
import { cn, isJapaneseLocale } from "../../lib/utils";
import HelpText from "./HelpText/HelpText";
import { Input } from "./Input";
import MyText from "./MyText";
import SubmitSuccess from "./SubmitSuccess";
import SuperRadio, { SuperRadioItemProps } from "./SuperRadio/SuperRadio";
import LoaderIcon from "./Loader/LoaderIcon";

interface Props {
  initialData: RsvpFormValues;
  setRunConfetti: Dispatch<SetStateAction<boolean>>;
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
  joinCeremony: z.literal("yes"),
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
  joinCeremony: z.literal("yes"),
  attendantNum: z.number().int().min(1, { message: "Has to be >= 1." }),
  attendants: z.array(attendantSchema),
  needPickup: z.literal("yes"),
  pickupSpot: z.enum(["Gimcheon_Gumi", "Park_Hotel"] as const, {
    errorMap: (issue, ctx) => {
      return { message: "Please select your pickup spot" };
    },
  }),
});

const notAttendSchema = z.object({
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

  joinCeremony: z.literal("no"),
});

const schema = z.union([noNeedBusSchema, needBusSchema, notAttendSchema]);
type NoNeedBusFormData = z.infer<typeof noNeedBusSchema>;
type NeedBusFormData = z.infer<typeof needBusSchema>;
type AttendFormData = NoNeedBusFormData | NeedBusFormData;
type NotAttendFormData = z.infer<typeof needBusSchema>;
type FormData = z.infer<typeof schema>;

export type RsvpFormValues = z.infer<typeof schema>;

const RsvpEditorUnion = ({ initialData, setRunConfetti, className }: Props) => {
  const t = useTranslations("rsvp");
  const path = usePathname();

  const isJapanese = isJapaneseLocale(path);

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

      value: "yes",
    },
    {
      mainLabel: t("ceremonyParticipationAnswer2Label"),

      value: "no",
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

  const isJoin = watch("joinCeremony") === "yes";

  const attendantNum = watch("attendantNum");

  useEffect(() => {
    //attendantNum is null if not attend
    if (!attendantNum) form.setValue("attendants", []);
  }, [attendantNum]);
  // attendants list

  useEffect(() => {
    if (!attendantNum || attendantNum <= 0) return;

    // clear
    for (let i = 0; i < fields.length - 1; i++) {
      remove(i);
    }

    // append

    const newItems = Array.from(Array(attendantNum).keys()).map((i) => {
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

  useEffect(() => {
    if (!isJoin) form.unregister("relationship");
  }, [isJoin]);

  return (
    <Form {...form}>
      {/* <button onClick={() => setIsSuccess(!isSuccess)}>toggle</button> */}
      <Transition
        show={!isSuccess}
        leave="duration-500 ease-out"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-full"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx("container md:max-w-[600px] mb-12", className)}
        >
          {/* <pre>{JSON.stringify(watch(), null, 4)}</pre> */}
          {/* need relative on higher component */}

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
              {isJapanese ? (
                <>
                  {/* last name */}
                  <div>
                    <label className="ml-1 font-bold">
                      {t("lastNameLabel")}
                    </label>
                    <Input
                      type="text"
                      {...register("lastName")}
                      placeholder={t("lastNamePlaceholder")}
                    />
                    {errors.lastName && (
                      <HelpText message={errors.lastName.message} />
                    )}
                  </div>

                  {/* first name */}
                  <div className="mt-2">
                    <label className="ml-1 font-bold">
                      {t("firstNameLabel")}
                    </label>
                    <Input
                      type="text"
                      {...register("firstName")}
                      placeholder={t("firstNamePlaceholder")}
                    />
                    {errors.firstName && (
                      <HelpText message={errors.firstName.message} />
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* first name */}
                  <div className="mt-2">
                    <label className="ml-1 font-bold">
                      {t("firstNameLabel")}
                    </label>
                    <Input
                      type="text"
                      {...register("firstName")}
                      placeholder={t("firstNamePlaceholder")}
                    />
                    {errors.firstName && (
                      <HelpText message={errors.firstName.message} />
                    )}
                  </div>
                  {/* last name */}
                  <div>
                    <label className="ml-1 font-bold">
                      {t("lastNameLabel")}
                    </label>
                    <Input
                      type="text"
                      {...register("lastName")}
                      placeholder={t("lastNamePlaceholder")}
                    />
                    {errors.lastName && (
                      <HelpText message={errors.lastName.message} />
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <div className="mt-2">
                <MyText className="ml-1 font-bold">
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
                    isJoin ? "block" : "hidden"
                  )}
                >
                  * {t("arrivalTime")}
                </p>
              </div>

              {/* for those who join */}
              {isJoin && (
                <div>
                  <div className="mt-2">
                    <label className="ml-1 font-bold">
                      {t("relationshipLabel")}
                    </label>
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
                  <div className="mt-4">
                    <label className="ml-1 font-bold">
                      {t("attendantNumQuestion")}
                    </label>
                    <Input
                      type="number"
                      {...register("attendantNum", {
                        valueAsNumber: true,
                        shouldUnregister: true,
                      })}
                      className="placeholder:text-gray-400"
                      placeholder="1,2,3"
                      // defaultValue={undefined}
                      min={1}
                    />
                    {(errors as FieldErrorsImpl<AttendFormData>)
                      .attendantNum && (
                      <HelpText
                        message={
                          (errors as FieldErrorsImpl<AttendFormData>)
                            .attendantNum?.message
                        }
                      />
                    )}
                  </div>

                  {/* attendants list */}

                  <div
                    className={cn(
                      fields.length > 1 ? "flex flex-col gap-4 mt-4" : "hidden"
                    )}
                  >
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
                          {isJapanese ? (
                            <>
                              {/* last name */}
                              <div>
                                <Input
                                  type="text"
                                  {...register(`attendants.${index}.lastName`, {
                                    shouldUnregister: true,
                                  })}
                                  value={
                                    index === 0 ? watch("lastName") : undefined
                                  }
                                  disabled={index === 0}
                                  placeholder={t("lastNamePlaceholder")}
                                />
                                {(errors as FieldErrorsImpl<AttendFormData>)
                                  .attendants?.[index]?.lastName && (
                                  <HelpText
                                    message={
                                      (
                                        errors as FieldErrorsImpl<AttendFormData>
                                      ).attendants?.[index]?.lastName?.message
                                    }
                                  />
                                )}
                              </div>
                              {/* first name */}
                              <div>
                                <Input
                                  type="text"
                                  value={
                                    index === 0 ? watch("firstName") : undefined
                                  }
                                  disabled={index === 0}
                                  {...register(`attendants.${index}.firstName`)}
                                  placeholder={t("firstNamePlaceholder")}
                                />
                                {(errors as FieldErrorsImpl<AttendFormData>)
                                  .attendants?.[index]?.firstName && (
                                  <HelpText
                                    message={
                                      (
                                        errors as FieldErrorsImpl<AttendFormData>
                                      ).attendants?.[index]?.firstName?.message
                                    }
                                  />
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              {/* last name */}

                              {/* first name */}
                              <div>
                                <Input
                                  type="text"
                                  value={
                                    index === 0 ? watch("firstName") : undefined
                                  }
                                  disabled={index === 0}
                                  {...register(`attendants.${index}.firstName`)}
                                  placeholder={t("firstNamePlaceholder")}
                                />
                                {(errors as FieldErrorsImpl<AttendFormData>)
                                  .attendants?.[index]?.firstName && (
                                  <HelpText
                                    message={
                                      (
                                        errors as FieldErrorsImpl<AttendFormData>
                                      ).attendants?.[index]?.firstName?.message
                                    }
                                  />
                                )}
                              </div>
                              <Input
                                type="text"
                                {...register(`attendants.${index}.lastName`, {
                                  shouldUnregister: true,
                                })}
                                value={
                                  index === 0 ? watch("lastName") : undefined
                                }
                                disabled={index === 0}
                                placeholder={t("lastNamePlaceholder")}
                              />
                              {(errors as FieldErrorsImpl<AttendFormData>)
                                .attendants?.[index]?.lastName && (
                                <HelpText
                                  message={
                                    (errors as FieldErrorsImpl<AttendFormData>)
                                      .attendants?.[index]?.lastName?.message
                                  }
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <MyText className="ml-1 font-bold">
                      {t("pickupQuestion")}
                    </MyText>
                    <SuperRadio
                      orientation="HORIZONTAL"
                      className="flex flex-col md:flex-row w-full gap-2"
                      items={pickupServiceOptions}
                      {...register("needPickup", { shouldUnregister: true })}
                    />
                  </div>

                  {watch("needPickup") === "yes" && (
                    <div className="mt-4">
                      <MyText className="ml-1 font-bold">
                        {t("pickupSpotQuestion")}
                      </MyText>
                      <SuperRadio
                        orientation="HORIZONTAL"
                        className="flex flex-col w-full gap-2"
                        items={pickupSpotOptions}
                        {...register("pickupSpot", { shouldUnregister: true })}
                      />

                      {(errors as FieldErrorsImpl<NeedBusFormData>)
                        .pickupSpot && (
                        <HelpText
                          message={
                            (errors as FieldErrorsImpl<NeedBusFormData>)
                              .pickupSpot?.message
                          }
                        />
                      )}
                    </div>
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
                className="gap-2 items-center"
              >
                <LoaderIcon className={isSubmitting ? "block" : "invisible"} />
                {!isSubmitting ? t("ctaLabel") : t("ctaLabelLoading")}
                <LoaderIcon className="invisible" />
              </Button>
            </div>
          </div>
        </form>
      </Transition>

      <Transition
        show={isSuccess}
        enter="transition ease-out duration-[2000ms] transform"
        enterFrom="translate-y-full opacity-0"
        enterTo="translate-y-0 opacity-100"
      >
        <SubmitSuccess />
      </Transition>
    </Form>
  );
};
export default RsvpEditorUnion;
