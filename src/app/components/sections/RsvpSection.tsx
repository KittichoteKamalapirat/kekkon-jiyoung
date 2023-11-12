import clsx from "clsx";
import RsvpEditor from "../RsvpEditor";

interface Props {
  className?: string;
}

const RsvpSection = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "md:h-[80vh] mt-12 w-full flex flex-col items-center justify-center relative bg-primary-50 ",
        className
      )}
    >
      <RsvpEditor
        initialData={{
          firstName: "",
          lastName: "",
          joinCeremony: "",
          needPickup: "",
        }}
      />
    </div>
  );
};
export default RsvpSection;
