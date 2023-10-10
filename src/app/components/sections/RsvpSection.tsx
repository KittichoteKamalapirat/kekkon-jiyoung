"use client";
import clsx from "clsx";
import RsvpEditor from "../RsvpEditor";
import RsvpEditorHtmlForm from "../RsvpEditorHtmlForm";

interface Props {
  className?: string;
}

const RsvpSection = ({ className }: Props) => {
  return (
    <div className={clsx("", className)}>
      <RsvpEditor initialData={{ firstName: "", lastName: "" }} />
      <RsvpEditorHtmlForm />
    </div>
  );
};
export default RsvpSection;
