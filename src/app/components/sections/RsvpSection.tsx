"use client";
import clsx from "clsx";
import RsvpEditor from "../RsvpEditor";
import RsvpEditorHtmlForm from "../RsvpEditorHtmlForm";

interface Props {
  className?: string;
}

const RsvpSection = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "h-[80vh] flex flex-col items-center justify-center",
        className
      )}
    >
      <RsvpEditor
        initialData={{
          firstName: "",
          lastName: "",
          joinCeremony: "",
          pickupNeed: "",
        }}
      />
    </div>
  );
};
export default RsvpSection;
