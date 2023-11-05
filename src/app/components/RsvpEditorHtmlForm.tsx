import clsx from "clsx";
import MyText from "./MyText";
import TextField from "./TextField/TextField";
import { Input } from "./Input";

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
      <MyText>Register</MyText>

      <div className="mt-4 flex flex-col gap-4">
        <Input type="text" name="firstName" placeholder="First Name" />
        <Input type="text" name="lastName" placeholder="Last Name" />

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
