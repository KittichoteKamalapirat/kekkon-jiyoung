import clsx from "clsx";

interface Props {
  className?: string;
}

const RsvpEditorHtmlForm = ({ className }: Props) => {
  return (
    <form
      method="post"
      action={process.env.NEXT_PUBLIC_APP_SCRIPT_URL}
      className={clsx("w-full", className)}
    >
      <p>Register</p>

      <div className="mt-4 flex flex-col gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="border-black border-2"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="border-black border-2"
        />

        <input value="Submit" type="submit" />
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
export default RsvpEditorHtmlForm;
