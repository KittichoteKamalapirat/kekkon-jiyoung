import { useForm } from "react-hook-form";
import { z } from "zod";

import clsx from "clsx";
import { postToGoogleSheets } from "../../actions";

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
});

export type RsvpFormValues = z.infer<typeof schema>;

const RsvpEditor = ({ initialData, className }: Props) => {
  const onSubmit = async (data: RsvpFormValues) => {
    try {
      console.log("data", data);
      const reponse2 = await postToGoogleSheets(data);

      // console.log("response", reponse2.data);
    } catch (error) {
      console.error("error posting RSVP", error);
    }
  };
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
      className={clsx("w-full", className)}
    >
      <p>Register</p>

      <div className="mt-4 flex flex-col gap-4">
        <label htmlFor="">first name</label>
        <input
          type="text"
          {...register("firstName")}
          className="border-black border-2"
        />
        <label htmlFor="">last name</label>
        <input
          type="text"
          {...register("lastName")}
          className="border-black border-2"
        />
        <button type="submit">submit</button>
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
