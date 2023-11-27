import Confetti from "react-confetti";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import { cn } from "../../../lib/utils";
import { useAnimateOnSroll } from "../../hooks/useAnimateOnScroll";
import RsvpEditorUnion from "../RsvpEditorUnion";
import { useWindowSize } from "react-use";

interface Props {
  className?: string;
}

const RsvpSection = ({ className }: Props) => {
  const { ref: sectionRef, animateClassName } = useAnimateOnSroll();
  const [runConfetti, setRunConfetti] = useState<boolean>(false);
  const { width, height } = useWindowSize();
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
        <RsvpEditorUnion
          initialData={{
            firstName: "",
            lastName: "",
            joinCeremony: "no",
            // needPickup: "no",
            // relationship: "",
            // attendantNum: 1,
            // attendants: [{ firstName: "", lastName: "" }],
          }}
          setRunConfetti={setRunConfetti}
          className={cn(animateClassName, "bg-white rounded-lg py-8 my-8")}
        />
      </div>
      {runConfetti && (
        <Confetti
          width={width}
          height={height * 2} // height * 1 is too short
          colors={[
            "#fff1f2", // primary 50
            "#ffe4e6", // primary 100
            "#fecdd3", // primary 200
            "#fda4af", // primary 300
            "#fb7185", // primary 400
            "#f43f5e", // primary 500
          ]}
          // opacity={0.8}
          gravity={0.4}
          // numberOfPieces={2000}
          // run={runConfetti}
          style={{ zIndex: 30 }} // seems like default is 2?,i won't overflow anyway since overflow-y hidden
          recycle={true} // whether to loop or not
          confettiSource={{
            x: 0,
            y: -height,
            w: width,
            h: height,
          }}
        />
      )}

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
