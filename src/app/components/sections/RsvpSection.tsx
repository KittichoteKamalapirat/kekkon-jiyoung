import clsx from "clsx";
import Image from "next/image";
import { InView } from "react-intersection-observer";
import { cn } from "../../../lib/utils";
import { useAnimateOnSroll } from "../../hooks/useAnimateOnScroll";
import RsvpEditor from "../RsvpEditor";
import { useState } from "react";

interface Props {
  className?: string;
}

const RsvpSection = ({ className }: Props) => {
  const { ref: sectionRef, animateClassName } = useAnimateOnSroll();
  const [templeIsInView, setTempleIsInView] = useState<boolean>(false);
  const [wheelIsInView, setWheelIsInView] = useState<boolean>(false);
  return (
    <div
      className={clsx(
        "md:min-h-[80vh] mt-12 w-full flex flex-col items-center justify-center relative bg-primary-50 overflow-hidden", // overflow hidden for the castle
        className
      )}
    >
      {/* dummy */}
      <div
        ref={sectionRef}
        className="absolute top-1/2 left-1/2 w-10 h-10 opacity-0"
      />
      <div className="container z-20">
        <RsvpEditor
          initialData={{
            firstName: "",
            lastName: "",
            joinCeremony: "",
            needPickup: "no",
            relationship: "",
            attendantNum: 1,
            attendants: [{ firstName: "", lastName: "" }],
          }}
          className={cn(animateClassName, "bg-white rounded-lg py-8 my-8")}
        />
      </div>

      {/* temple */}
      <InView
        as="div"
        onChange={setTempleIsInView}
        initialInView={false}
        triggerOnce
        // rootMargin="-200px"
      >
        <Image
          alt="Korean Temple"
          src="/images/temple.svg"
          width={400}
          height={400}
          className={cn(
            "w-[500px]",
            "absolute mx-auto top-0 -left-1/4 md:left-0 xl:left-1/4 opacity-20 z-10 blur-sm",
            "transition-all duration-[3000ms] ease-in-out",
            templeIsInView ? "translate-y-0" : "translate-y-[1000px]"
          )}
        />
      </InView>

      {/* wheel */}
      <InView
        as="div"
        onChange={setWheelIsInView}
        initialInView={false}
        triggerOnce
      >
        <Image
          alt="Wheel"
          src="/images/wheel.svg"
          width={450}
          height={450}
          className={cn(
            "w-[400px] hidden xl:block",
            "absolute mx-auto bottom-0 right-0 opacity-10 z-10 blur-sm",
            "transition-transform duration-[2000ms] delay-[1000ms] ease-in-out",
            wheelIsInView ? "translate-y-0" : "translate-y-[1000px]"
          )}
        />
      </InView>
    </div>
  );
};
export default RsvpSection;
