import clsx from "clsx";
import RsvpEditor from "../RsvpEditor";
import { useAnimateOnSroll } from "../../hooks/useAnimateOnScroll";

interface Props {
  className?: string;
}

const RsvpSection = ({ className }: Props) => {
  const { ref: sectionRef, animateClassName } = useAnimateOnSroll();
  return (
    <div
      className={clsx(
        "md:h-[80vh] mt-12 w-full flex flex-col items-center justify-center relative bg-primary-50 ",
        className
      )}
    >
      {/* dummy */}
      <div
        ref={sectionRef}
        className="absolute top-1/2 left-1/2 w-10 h-10 opacity-0"
      />
      <RsvpEditor
        initialData={{
          firstName: "",
          lastName: "",
          joinCeremony: "",
          needPickup: "",
          relationship: "",
        }}
        className={animateClassName}
      />
    </div>
  );
};
export default RsvpSection;
